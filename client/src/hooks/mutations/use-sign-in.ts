import signIn from "@/actions/post/sign-in";
import { useMutation } from "@tanstack/react-query";

export const useSignIn = () => {
  const mutation = useMutation({
    mutationFn: signIn,
  });
  return mutation;
};
