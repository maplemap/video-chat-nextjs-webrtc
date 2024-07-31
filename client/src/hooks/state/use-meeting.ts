import { JoinStatus, Nullable } from "@/types";
import { Meeting } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  meeting: Nullable<Meeting>;
  joinStatus: JoinStatus;
};

type Actions = {
  setMeeting: (meeting: Nullable<Meeting>) => void;
  setJoinStatus: (status: JoinStatus) => void;
};

export const useMeeting = create<State & Actions>()(
  immer((set) => ({
    meeting: null,
    joinStatus: "idle",
    setMeeting: (meeting) =>
      set((state) => {
        state.meeting = meeting;
      }),
    setJoinStatus: (status) =>
      set((state) => {
        state.joinStatus = status;
      }),
  })),
);
