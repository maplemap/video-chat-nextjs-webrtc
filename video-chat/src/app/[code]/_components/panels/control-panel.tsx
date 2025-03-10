'use client';

import toast from 'react-hot-toast';
import { IoExitOutline } from 'react-icons/io5';
import { LuCopy, LuMic, LuMicOff, LuVideo, LuVideoOff } from 'react-icons/lu';
import { useShallow } from 'zustand/react/shallow';
import { useRouter } from 'next/navigation';
import { useCopyToClipboard } from 'usehooks-ts';
import Time from '@/components/navbar/time';
import { Button } from '@/components/ui/button';
import { useMeeting } from '@/hooks/state/use-meeting';
import { usePeer } from '@/hooks/state/use-peer';
import { useSocket } from '@/hooks/state/use-socket';
import { useStream } from '@/hooks/state/use-stream';
import { MediaKind } from '@/types';

export default function ControlPanel() {
  const { muted, visible, toggleAudio, toggleVideo } = useStream();
  const { meeting, connections } = useMeeting(
    useShallow((state) => ({
      meeting: state.meeting,
      connections: state.connections,
    }))
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast.success('Copied!');
      })
      .catch((error) => {
        console.log(error); // eslint-disable-line no-console
        toast.error('Failed to copy!');
      });
  };
  const router = useRouter();
  const socket = useSocket();
  const myPeerId = usePeer((state) => state.myPeerId);
  const toggle = (kind: MediaKind) => {
    switch (kind) {
      case 'audio':
        toggleAudio();
        socket.emit('user:toggle-audio', myPeerId);
        break;
      case 'video':
        toggleVideo((newTrack: MediaStreamTrack) => {
          Object.values(connections).forEach((el) => {
            const sender = el.peerConnection?.getSenders().find((s) => {
              return s.track?.kind === newTrack.kind;
            });
            sender?.replaceTrack(newTrack);
          });
        });
        socket.emit('user:toggle-video', myPeerId);
        break;
      default:
        break;
    }
  };
  return (
    <div className='h-[6vh] px-3 pb-3'>
      <div className='grid h-full w-full grid-cols-[1.5fr,1fr] items-center bg-light-primary px-3 dark:bg-dark-primary md:grid-cols-3'>
        <Time className='hidden md:block' />
        <div className='flex gap-x-3 xs:justify-end md:justify-center'>
          <Button
            className='accent-red-500'
            size='icon'
            variant='ghost'
            color='red'
            onClick={() => {
              router.push('/');
            }}
          >
            <IoExitOutline
              color='red'
              className='h-6 w-6 rotate-180'
              title='exit'
            />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              toggle('audio');
            }}
          >
            {muted ? (
              <LuMicOff className='h-6 w-6' />
            ) : (
              <LuMic className='h-6 w-6' />
            )}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => {
              toggle('video');
            }}
          >
            {visible ? (
              <LuVideo className='h-6 w-6' />
            ) : (
              <LuVideoOff className='h-6 w-6' />
            )}
          </Button>
        </div>
        <div
          onClick={() => handleCopy(meeting?.code as string)}
          className='flex cursor-pointer items-center gap-x-2 justify-self-end'
        >
          <LuCopy />
          <span className='hidden xs:block'>{meeting?.code}</span>
          <span className='xs:hidden'>{`${meeting?.code.slice(0, 6)}...`}</span>
        </div>
      </div>
    </div>
  );
}
