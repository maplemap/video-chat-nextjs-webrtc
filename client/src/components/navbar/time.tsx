'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import { useInterval } from 'usehooks-ts';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default function Time({ className }: Props) {
  const [time, setTime] = useState('');

  useInterval(() => {
    setTime(dayjs().format('HH:mm | ddd, MMM D'));
  }, 1000);

  return (
    <span className={cn('text-md sm:text-lg md:text-xl', className)}>
      {time}
    </span>
  );
}
