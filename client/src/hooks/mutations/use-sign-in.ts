import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/actions/post/sign-in';

export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};
