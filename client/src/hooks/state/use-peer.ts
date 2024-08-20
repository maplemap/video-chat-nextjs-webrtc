import { Nullable, PeerId } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import Peer from "peerjs";

type State = {
  peer: Nullable<Peer>;
  myPeerId: PeerId;
};
type Actions = {
  setPeer: (peer: Nullable<Peer>) => void;
  setMyPeerId: (peerId: PeerId) => void;
};
export const usePeer = create<State & Actions>()(
  immer((set) => ({
    peer: null,
    myPeerId: "",
    setPeer: (peer) =>
      set((state) => {
        state.peer = peer;
      }),
    setMyPeerId: (peerId) =>
      set((state) => {
        state.myPeerId = peerId;
      }),
  })),
);
