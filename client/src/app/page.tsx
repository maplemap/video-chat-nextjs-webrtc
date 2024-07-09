import Navbar from '@/components/navbar';
import { Separator } from '@/components/ui/separator';
import {
  CreatingMeetingWidget,
  JoinMeetingWidget,
  RecentMeetingWidget,
} from './_components/widgets';

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <div className="grid grow gap-5 p-5 md:grid-cols-[1.7fr,1fr]">
        <div className="rounded-xl bg-light-primary p-5 dark:bg-dark-primary">
          <h2 className="text-xl font-bold">Join or create meeting</h2>
          <h3 className="mb-2 mt-5 text-lg">Join meeting with code</h3>
          <JoinMeetingWidget />
          <h3 className="mb-2 mt-5 text-lg">Create new meeting</h3>
          <CreatingMeetingWidget />
          <Separator className="my-5" />
          <h2 className="text-xl font-bold">Recent meeting</h2>
          <RecentMeetingWidget />
        </div>
        <div className="flex items-center justify-center rounded-xl bg-light-primary p-5 dark:bg-dark-primary">
          <div className="p5 text-center text-2xl">
            Video chat app using Next.js, Socket.io, Tailwind CSS, and WebRTC
          </div>
        </div>
      </div>
    </main>
  );
}
