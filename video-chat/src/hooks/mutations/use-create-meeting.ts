import createMeeting from "@/actions/post/create-meeting";
import { useMutation } from "@tanstack/react-query";

export const useCreateMeeting = () => {
  const mutation = useMutation({ mutationFn: createMeeting });
  return mutation;
};
