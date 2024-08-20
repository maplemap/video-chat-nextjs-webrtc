"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRecentMeetings } from "@/hooks/state/use-recent-meetings";
import { useRouter } from "next/navigation";

export default function RecentMeetingsWidget() {
  const meetings = useRecentMeetings((state) => state.meetings);
  const router = useRouter();
  return (
    <ScrollArea className="h-[280px]">
      <div className="space-y-2 pr-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="flex items-center justify-between rounded-2xl bg-slate-200 p-3 dark:bg-gray-800"
          >
            <div className="text-md lg:text-lg">{meeting.name}</div>
            <div className="flex items-center gap-x-3">
              <div className="hidden text-lg lg:block">{meeting.code}</div>
              <Button onClick={() => router.push(meeting.code)}>Join</Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
