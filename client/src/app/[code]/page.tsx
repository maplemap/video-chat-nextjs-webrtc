'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Hearts } from 'react-loader-spinner';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/navigation';
import getMeetingByCode from '@/actions/get/get-meeting-by-code';
import { MeetingProvider } from '@/app/[code]/_components/providers';
import { useMeeting } from '@/hooks/state/use-meeting';
import { Code } from '@/types';
import { Route } from '../../../routes';
import Lobby from './_components/lobby';
import Meeting from './_components/meeting';

type Props = {
  params: { code: Code };
};
export default function MeetingPage({ params: { code } }: Props) {
  const [isLobby, setIsLobby] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { meeting, setMeeting } = useMeeting(
    useShallow((state) => ({
      meeting: state.meeting,
      setMeeting: state.setMeeting,
    })),
  );
  const router = useRouter();
  useEffect(() => {
    if (meeting) {
      setIsLoading(false);
      return;
    }
    getMeetingByCode(code).then((res) => {
      if (res) {
        setMeeting(res);
        setIsLoading(false);
      } else {
        toast.error('Meeting not found !');
        router.push(Route.MAIN);
      }
    });
  }, [code, meeting, setMeeting, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Hearts
          height="120"
          width="120"
          color="#4a8be0"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <MeetingProvider joinMeeting={() => setIsLobby(false)}>
      {isLobby ? <Lobby /> : <Meeting />}
    </MeetingProvider>
  );
}
