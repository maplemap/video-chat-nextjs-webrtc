'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateMeeting } from '@/hooks/mutations/use-create-meeting';
import { useMeeting } from '@/hooks/state/use-meeting';
import {
  CreateMeetingFields,
  CreateMeetingValidationSchema,
} from '@/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export function CreatingMeetingWidget() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMeetingFields>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(CreateMeetingValidationSchema),
  });

  const {
    mutateAsync,
    reset: resetMutation,
    isIdle: isMutationIdle,
    isPending: isMutationPending,
    isSuccess: isMutationSuccess,
  } = useCreateMeeting();
  const setMeeting = useMeeting((state) => state.setMeeting);
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateMeetingFields> = async (data) => {
    const onSuccess = (res) => {
      if (res?.error) {
        toast.error(res.error);
        resetMutation();
      }
      if (res.success) {
        toast.success('Meeting was created successfully');
        setMeeting(res.success);
        console.log(res.success.code);
        router.push(res.success.code);
      }
    };

    await mutateAsync(data, { onSuccess });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Create new meeting</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="name">
            <Input
              {...register('name')}
              id="name"
              placeholder="English lesson"
              className="mt-2 h-10"
              maxLength={110}
            />
          </Label>
          {errors.name && (
            <span className="ml-5 text-xs text-red-500">
              {errors.name.message}
            </span>
          )}
          <Button
            disabled={isMutationPending}
            className="mt-2 w-full"
            type="submit"
            size="sm"
          >
            {isMutationIdle && 'Create new meeting'}
            {isMutationPending && 'Creating new meeting'}
            {isMutationSuccess && 'Meeting was created'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
