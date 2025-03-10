'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRecentMeetings } from '@/hooks/state/use-recent-meetings';

export default function RecentMeetingsWidget() {
  const meetings = useRecentMeetings((state) => state.meetings);
  const router = useRouter();

  return (
    <ScrollArea className='h-[280px]'>
      <div className='space-y-2 pr-4'>
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className='flex items-center justify-between rounded-sm bg-gray-100 p-3 dark:bg-gray-800'
          >
            <div className='text-md lg:text-lg'>{meeting.name}</div>
            <div className='flex items-center gap-x-3'>
              <div className='hidden text-lg lg:block'>{meeting.code}</div>
              <Button
                className='h-[40px]'
                onClick={() => router.push(meeting.code)}
              >
                Join
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
