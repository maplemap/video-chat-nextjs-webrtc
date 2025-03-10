import { useMutation } from '@tanstack/react-query';
import signUp from '@/actions/post/sign-up';

export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};
