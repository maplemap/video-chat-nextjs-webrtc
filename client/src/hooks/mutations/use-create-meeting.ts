import { useMutation } from '@tanstack/react-query';
import { createMeeting } from '@/actions/post/create-meeting';
import { CreateMeetingFields } from '@/types/forms';

export const useCreateMeeting = () => {
  return useMutation({ mutationFn: createMeeting });
};
