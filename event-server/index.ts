import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { ClientToServerEvents, KeyValue, ServerToClientEvents } from "./types";

dotenv.config();

const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL || "https://localhost:3000";
const app: Application = express();

app.use(cors());

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(
  expressServer,
  {
    cors: {
      origin: [CLIENT_URL],
      methods: ["GET", "POST"],
    },
  },
);

const meetings: KeyValue<{
  ownerId: string;
  ownerSocketId: string;
  members: number;
}> = {};

io.on("connection", (socket) => {
  socket.on("user:join-request", ({ code, user, ownerId }) => {
    if (meetings[code]?.members >= 9) {
      return socket.emit("meeting:full");
    }
    if (user.id === ownerId) {
      if (!meetings[code]?.members) {
        meetings[code] = {
          ownerId,
          ownerSocketId: socket.id,
          members: 1,
        };
      } else {
        meetings[code].members += 1;
      }

      return socket.emit("user:accepted", { code, user });
    }

    if (!meetings[code]?.ownerId || !meetings[code]?.ownerSocketId) {
      return socket.emit("user:wait-for-owner");
    }

    io.to(meetings[code]?.ownerSocketId).emit("user:join-request", {
      ...user,
      socketId: socket.id,
    });
  });

  socket.on("user:accepted", ({ code, user }) => {
    meetings[code].members += 1;
    io.to(user.socketId).emit("user:accepted", { code, user });
  });

  socket.on("user:rejected", ({ code, user }) => {
    io.to(user.socketId).emit("user:rejected", { code, user });
  });

  socket.on("meeting:join", ({ code, user }) => {
    socket.join(code);
    socket.to(code).emit("user:joined", user);

    socket.on("user:toggle-audio", (userPeerId) => {
      socket.to(code).emit("user:toggled-audio", userPeerId);
    });

    socket.on("user:toggle-video", (userPeerId) => {
      socket.to(code).emit("user:toggled-video", userPeerId);
    });

    socket.on("disconnect", () => {
      if (meetings[code]?.ownerSocketId == socket.id) {
        meetings[code].ownerId = "";
        meetings[code].ownerSocketId = "";
      }
      if (meetings[code]?.members <= 1) {
        delete meetings[code];
      } else {
        meetings[code].members = meetings[code]?.members
          ? meetings[code]?.members - 1
          : 0;
      }

      socket.to(code).emit("user:left", user.peerId);
    });
  });
});

app.get("/", (req, res) => {
  res.redirect(CLIENT_URL);
});
