import { Nullable } from "@/types";
import { Meeting } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  meeting: Nullable<Meeting>;
};

type Actions = {
  setMeeting: (meeting: Nullable<Meeting>) => void;
};

export const useMeeting = create<State & Actions>()(
  immer((set) => ({
    meeting: null,
    setMeeting: (meeting) =>
      set((state) => {
        state.meeting = meeting;
      }),
  })),
);
