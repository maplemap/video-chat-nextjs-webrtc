import { create } from "zustand";
import { io } from "socket.io-client";
import { Socket } from "@/types";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string, {
  autoConnect: false,
});
export const useSocket = create<Socket>()(() => socket);
