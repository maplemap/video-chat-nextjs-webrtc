'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JoinMeetingFields, JoinMeetingValidationSchema } from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export default function JoinMeetingWidget() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<JoinMeetingFields>({
    mode: 'onBlur',
    defaultValues: {
      code: '',
    },
    resolver: zodResolver(JoinMeetingValidationSchema),
  });
  const watchCode = watch('code');
  const router = useRouter();
  const onSubmit: SubmitHandler<JoinMeetingFields> = async (data) => {
    router.push(data.code);
  };
  const onError: SubmitErrorHandler<JoinMeetingFields> = async (data) => {
    toast.error(data.code?.message || '');
  };
  return (
    <>
      <h3 className="mb-2 text-lg">Join meeting with code</h3>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="grid gap-3 sm:grid-cols-[3fr,1fr]"
      >
        <Input
          {...register('code')}
          className="h-10"
          placeholder="Enter code"
          maxLength={18}
        />
        <Button type="submit">{isSubmitting ? 'Validating' : 'Join'}</Button>
      </form>
      <div className="border-black- ml-2 mt-2 text-lg">
        {watchCode.length}/18
      </div>
    </>
  );
}
