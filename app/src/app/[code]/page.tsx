'use client';

import { useEffect, useState, use } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/navigation';
import getMeetingByCode from '@/actions/get/get-meeting-by-code';
import { useMeeting } from '@/hooks/state/use-meeting';
import { Code } from '@/types';
import { Route } from '../../../routes';
import { Spinner } from '../../components/ui/spinner';
import Lobby from './_components/lobby/lobby';
import Meeting from './_components/meeting/meeting';
import { MeetingProvider } from './_components/providers';

type Props = {
  params: Promise<{ code: Code }>;
};
export default function MeetingPage({ params }: Props) {
  const { code } = use(params);
  const [isLobby, setIsLobby] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { meeting, setMeeting } = useMeeting(
    useShallow((state) => ({
      meeting: state.meeting,
      setMeeting: state.setMeeting,
    }))
  );
  const router = useRouter();

  useEffect(() => {
    if (meeting) {
      setIsLoading(false);
      return;
    }
    if (!code) {
      toast.error('Invalid meeting code');
      router.push(Route.MAIN);
      return;
    }

    getMeetingByCode(code).then((res) => {
      if (res) {
        setMeeting(res);
        setIsLoading(false);
      } else {
        toast.error('Meeting not found!');
        router.push(Route.MAIN);
      }
    });
  }, [code, meeting, setMeeting, router]);

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <MeetingProvider joinMeeting={() => setIsLobby(false)}>
      {isLobby ? <Lobby /> : <Meeting />}
    </MeetingProvider>
  );
}
