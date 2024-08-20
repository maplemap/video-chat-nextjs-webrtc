import {
  JoinStatus,
  KeyValue,
  Nullable,
  PeerConnection,
  PeerId,
  PeerUserWithSocketId,
} from "@/types";
import { Meeting } from "@prisma/client";
import { MediaConnection } from "peerjs";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  meeting: Nullable<Meeting>;
  joinStatus: JoinStatus;
  joinRequests: PeerUserWithSocketId[];
  connections: KeyValue<MediaConnection>;
  streamsList: KeyValue<MediaStream>;
  mutedList: KeyValue<boolean>;
  visibleList: KeyValue<boolean>;
  namesList: KeyValue<string>;
  imagesList: KeyValue<string>;
};

type Actions = {
  setMeeting: (meeting: Nullable<Meeting>) => void;
  setJoinStatus: (status: JoinStatus) => void;
  addJoinRequest: (req: PeerUserWithSocketId) => void;
  removeJoinRequest: (peerId: PeerId) => void;
  addConnection: (values: PeerConnection) => void;
  removeConnection: (peerId: PeerId) => void;
  setPeerMuted: (peerId: PeerId, value: boolean) => void;
  setPeerVisible: (peerId: PeerId, value: boolean) => void;
  reset: () => void;
};

export const useMeeting = create<State & Actions>()(
  immer((set) => ({
    meeting: null,
    joinStatus: "idle",
    joinRequests: [],
    connections: {},
    streamsList: {},
    mutedList: {},
    visibleList: {},
    namesList: {},
    imagesList: {},
    setMeeting: (meeting) =>
      set((state) => {
        state.meeting = meeting;
      }),
    setJoinStatus: (status) =>
      set((state) => {
        state.joinStatus = status;
      }),
    addJoinRequest: (req) =>
      set((state) => {
        state.joinRequests.push(req);
      }),
    removeJoinRequest: (peerId) =>
      set((state) => {
        state.joinRequests = state.joinRequests.filter(
          (req) => req.peerId !== peerId,
        );
      }),
    addConnection: ({
      peerId,
      connection,
      muted,
      visible,
      name,
      image,
      stream,
    }) =>
      set((state) => {
        state.streamsList[peerId] = stream;
        state.connections[peerId] = connection;
        state.mutedList[peerId] = muted;
        state.visibleList[peerId] = visible;
        state.namesList[peerId] = name;
        state.imagesList[peerId] = image;
      }),
    removeConnection: (peerId) =>
      set((state) => {
        delete state.streamsList[peerId];
        delete state.connections[peerId];
        delete state.mutedList[peerId];
        delete state.visibleList[peerId];
        delete state.namesList[peerId];
        delete state.imagesList[peerId];
      }),
    setPeerMuted: (peerId, value) =>
      set((state) => {
        state.mutedList[peerId] = value;
      }),
    setPeerVisible: (peerId, value) =>
      set((state) => {
        state.visibleList[peerId] = value;
      }),
    reset: () =>
      set((state) => {
        state.meeting = null;
        state.joinStatus = "idle";
        state.joinRequests = [];
        state.connections = {};
        state.streamsList = {};
        state.mutedList = {};
        state.visibleList = {};
        state.namesList = {};
        state.imagesList = {};
      }),
  })),
);
