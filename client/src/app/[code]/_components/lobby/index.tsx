'use client';

import { useEffect } from 'react';
import { LuMic, LuMicOff, LuVideo, LuVideoOff } from 'react-icons/lu';
import { ColorRing } from 'react-loader-spinner';
import { useShallow } from 'zustand/react/shallow';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { useMeeting } from '@/hooks/state/use-meeting';
import { useStream } from '@/hooks/state/use-stream';
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
  const { joinStatus, meeting } = useMeeting(
    useShallow((state) => ({
      joinStatus: state.joinStatus,
      meeting: state.meeting,
    })),
  );
  useEffect(() => {
    if (!stream) getStream();
  }, [stream, getStream]);
  const handleJoin = () => {};
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex grow items-center p-5">
        <div className="grid h-[90%] w-full gap-5 md:grid-cols-[2fr,1fr]">
          <div className="relative">
            <MyStream />
            {status === 'success' && (
              <div className="absolute bottom-0 right-0 flex gap-x-1 p-3">
                <Button onClick={toggleAudio} size="icon">
                  {muted ? (
                    <LuMicOff className="h-6 w-6" />
                  ) : (
                    <LuMic className="h-6 w-6" />
                  )}
                </Button>
                <Button onClick={toggleVideo} size="icon">
                  {visible ? (
                    <LuVideo className="h-6 w-6" />
                  ) : (
                    <LuVideoOff className="h-6 w-6" />
                  )}{' '}
                </Button>
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
                    <Button onClick={handleJoin} size={'lg'}>
                      Join
                    </Button>
                  </>
                )}
              </>
            )}
            {joinStatus === 'loading' && (
              <>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    '#0060FF',
                    '#87CEEB',
                    '#FFFFFF',
                    '#89CFF0',
                    '#C0C0C0',
                  ]}
                />
                <span>Wait untill meeting owner accept your request</span>
              </>
            )}
            {joinStatus === 'rejected' && (
              <div>Meeting owner rejected your join request</div>
            )}
            {joinStatus === 'wait-for-owner' && (
              <>
                <div>{meeting?.name}</div>
                <div>Meeting owner in not here</div>
                <Button onClick={handleJoin} size={'lg'}>
                  Try again
                </Button>
              </>
            )}
            {joinStatus === 'room-is-full' && (
              <>
                <div className="mb-3">{meeting?.name}</div>
                <div>Meeting is full try again later</div>
                <Button onClick={handleJoin} size={'lg'}>
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
