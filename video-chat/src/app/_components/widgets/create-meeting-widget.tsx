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

export default function CreateMeetingWidget() {
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
  const { mutateAsync, reset, isIdle, isPending, isSuccess } =
    useCreateMeeting();
  const setMeeting = useMeeting((state) => state.setMeeting);
  const router = useRouter();

  const onSubmit: SubmitHandler<CreateMeetingFields> = async (data) => {
    await mutateAsync(data, {
      onSuccess: (res) => {
        if (res.error) {
          toast.error(res.error);
          reset();
        }
        if (res.success) {
          toast.success('Meeting created successfuly!');
          setMeeting(res.success);
          router.push(res.success.code);
        }
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='h-[40px] w-full'>Create new meeting</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create new meeting</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              {...register('name')}
              id='name'
              placeholder='English lesson'
              className='mt-2 h-10'
              maxLength={110}
            />
            <span className='text-sm text-red-500'>
              {errors.name?.message}
            </span>{' '}
          </div>
          <Button
            disabled={isPending}
            type='submit'
            className='mt-2 h-[40px] w-full'
          >
            {isIdle && 'Create new meeting'}
            {isPending && 'Creating new meeting'}
            {isSuccess && 'Meeting created successfully'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
