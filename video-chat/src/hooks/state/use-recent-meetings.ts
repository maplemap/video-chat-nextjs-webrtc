import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Meeting } from '@prisma/client';

type State = {
  meetings: Meeting[];
};
type Actions = {
  addMeeting: (meeting: Meeting) => void;
};

export const useRecentMeetings = create<State & Actions>()(
  immer(
    persist(
      (set, get) => ({
        meetings: [],
        addMeeting: (meeting) =>
          set((state) => {
            const currentMeetings = get().meetings;
            const isMeetingExistInState = currentMeetings.find(
              ({ id }) => id === meeting.id
            );

            if (!isMeetingExistInState) {
              state.meetings = [meeting, ...state.meetings].slice(0, 10);
            }
          }),
      }),
      {
        name: 'recent-meetings-storage', // name of the item in the storage (must be unique)
      }
    )
  )
);
