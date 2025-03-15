'use client';

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useInterval } from 'usehooks-ts';
import { cn } from '@/lib/utils';

const getTimeNow = () => dayjs().format('HH:mm | ddd, MMM D');

type Props = {
  className?: string;
};

export default function Time({ className }: Props) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(getTimeNow());
  }, []);

  useInterval(() => {
    setTime(getTimeNow());
  }, 1000);

  return (
    <span
      className={cn('mr-3 hidden text-lg tracking-tighter xs:block', className)}
    >
      {time ?? 'Loading...'}
    </span>
  );
}
