import Navbar from '@/components/navbar';
import { Separator } from '@/components/ui/separator';
import {
  CreateMeetingWidget,
  JoinMeetingWidget,
  RecentMeetingsWidget,
} from './_components/widgets';

export default function Home() {
  return (
    <main className="flex h-screen flex-col">
      <Navbar />
      <div className="grid grow gap-5 p-5 md:grid-cols-[1.7fr,1fr]">
        <div className="bg-light-primary p-5 dark:bg-dark-primary">
          <h2 className="mb-6 mt-5 text-xl font-bold">
            Join or create meeting
          </h2>
          <JoinMeetingWidget />
          <h3 className="mb-2 mt-6 text-lg">Create new meeting</h3>
          <CreateMeetingWidget />
          <h2 className="mb-4 mt-8 text-xl font-bold">Recent meetings</h2>
          <RecentMeetingsWidget />
        </div>
        <div className="flex items-center justify-center bg-light-primary p-5 dark:bg-dark-primary">
          <div className="p-5 text-center text-xl">
            Video chat app using Next.js Socket.io WebRTC
          </div>
        </div>
      </div>
    </main>
  );
}
