'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
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
      code: '',
    },
    resolver: zodResolver(CreateMeetingValidationSchema),
  });

  const onSubmit: SubmitHandler<CreateMeetingFields> = async (data) => {
    console.log(data.name);
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
          <Button className="mt-2 w-full" type="submit" size="sm">
            Create new meeting
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
