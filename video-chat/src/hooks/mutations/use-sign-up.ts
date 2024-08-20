import signUp from "@/actions/post/sign-up";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const mutation = useMutation({
    mutationFn: signUp,
  });
  return mutation;
};
