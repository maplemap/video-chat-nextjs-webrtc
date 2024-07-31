"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RecentMeetingsWidget() {
  return (
    <ScrollArea className="h-[280px]">
      <div className="space-y-2 pr-4">
        <div className="flex items-center justify-between rounded-2xl bg-slate-200 p-3 dark:bg-gray-800">
          <div className="text-md lg:text-lg">English lesson</div>
          <div className="flex items-center gap-x-3">
            <div className="hidden text-lg lg:block">ajalkgjsldgjl</div>
            <Button>Join</Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-200 p-3 dark:bg-gray-800">
          <div className="text-md lg:text-lg">English lesson</div>
          <div className="flex items-center gap-x-3">
            <div className="hidden text-lg lg:block">ajalkgjsldgjl</div>
            <Button>Join</Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-200 p-3 dark:bg-gray-800">
          <div className="text-md lg:text-lg">English lesson</div>
          <div className="flex items-center gap-x-3">
            <div className="hidden text-lg lg:block">ajalkgjsldgjl</div>
            <Button>Join</Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-200 p-3 dark:bg-gray-800">
          <div className="text-md lg:text-lg">English lesson</div>
          <div className="flex items-center gap-x-3">
            <div className="hidden text-lg lg:block">ajalkgjsldgjl</div>
            <Button>Join</Button>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-slate-200 p-3 dark:bg-gray-800">
          <div className="text-md lg:text-lg">English lesson</div>
          <div className="flex items-center gap-x-3">
            <div className="hidden text-lg lg:block">ajalkgjsldgjl</div>
            <Button>Join</Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
