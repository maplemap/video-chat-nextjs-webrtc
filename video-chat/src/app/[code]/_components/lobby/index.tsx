"use client";

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { LuMic, LuMicOff, LuVideo, LuVideoOff } from 'react-icons/lu';
import { ColorRing } from 'react-loader-spinner';
import { useShallow } from 'zustand/react/shallow';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useMeeting } from '@/hooks/state/use-meeting';
import { usePeer } from '@/hooks/state/use-peer';
import { useSocket } from '@/hooks/state/use-socket';
import { useStream } from '@/hooks/state/use-stream';
import { Spinner } from '../../../../components/ui/spinner';
import { MyStream } from '../streams';

export default function Lobby() {
  const {
    stream,
    status,
    muted,
    visible,
    getStream,
    toggleAudio,
    toggleVideo,
  } = useStream();
  const { joinStatus, meeting, setJoinStatus } = useMeeting(
    useShallow((state) => ({
      joinStatus: state.joinStatus,
      meeting: state.meeting,
      setJoinStatus: state.setJoinStatus,
    })),
  );
  const socket = useSocket();
  const peerId = usePeer((state) => state.myPeerId);
  const { data } = useSession();
  const yourName = `${data?.user?.name} (YOU)`;

  useEffect(() => {
    if (!stream) {
      getStream();
    }
  }, [stream, getStream]);

  const handleJoin = () => {
    setJoinStatus('loading');
    socket.emit('user:join-request', {
      code: meeting?.code as string,
      user: {
        peerId,
        id: data?.user.id as string,
        email: data?.user.email as string,
        name: data?.user.name as string,
        image: data?.user.image as string,
        muted,
        visible,
      },
      ownerId: meeting?.ownerId as string,
    });
  };

  const generateControllerButton = (
    type: 'audio' | 'video',
    active: boolean,
  ) => {
    const OffIcon = type === 'audio' ? LuMicOff : LuVideoOff;
    const OnIcon = type === 'audio' ? LuMic : LuVideo;
    const Icon = active ? OnIcon : OffIcon;
    const onClickHandler = type === 'audio' ? toggleAudio : toggleVideo;

    return (
      <Button onClick={onClickHandler} size="icon" variant="ghost">
        <Icon className="h-6 w-6" />
      </Button>
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex grow items-center p-5">
        <div className="grid h-[90%] w-full gap-5 md:grid-cols-[2fr,1fr]">
          <div className="relative">
            <p className="absolute right-0 top-[-40px] select-none p-2 text-lg font-medium">
              {yourName}
            </p>
            <MyStream />
            {status === 'success' && (
              <div className="column absolute right-[-48px] top-0 flex flex-col">
                {generateControllerButton('video', visible)}
                {generateControllerButton('audio', !muted)}
              </div>
            )}
          </div>
          <div className="grid place-content-center place-items-center gap-2 text-center">
            {joinStatus === 'idle' && (
              <>
                {status === 'loading' && <div>Waiting for your stream 😴</div>}
                {status === 'rejected' && (
                  <div>
                    You can not join without stream. Allow this site to use
                    video and audio 🎥
                  </div>
                )}
                {status === 'success' && (
                  <>
                    <div className="mb-3">{meeting?.name}</div>
                    <Button onClick={handleJoin} className="w-[100px]">
                      Join
                    </Button>
                  </>
                )}
              </>
            )}
            {joinStatus === 'loading' && (
              <>
                <Spinner />
                <span>Wait until meeting owner accept your request</span>
              </>
            )}
            {joinStatus === "rejected" && (
              <div>Meeting owner rejected your join request</div>
            )}
            {joinStatus === "wait-for-owner" && (
              <>
                <div>{meeting?.name}</div>
                <div>Meeting owner in not here</div>
                <Button onClick={handleJoin} size={"lg"}>
                  Try again
                </Button>
              </>
            )}
            {joinStatus === "room-is-full" && (
              <>
                <div className="mb-3">{meeting?.name}</div>
                <div>Meeting is full try again later</div>
                <Button onClick={handleJoin} size={"lg"}>
                  Try again
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
