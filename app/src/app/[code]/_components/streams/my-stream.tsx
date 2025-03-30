'use client';

import { useSession } from 'next-auth/react';
import { useStream } from '@/hooks/state/use-stream';
import { Spinner } from '../../../../components/ui/spinner';
import { VideoContainer } from '../containers';
import PeerVideo from '../peer/peer-video';

export default function MyStream() {
  const { stream, visible, status } = useStream();
  const { data } = useSession();
  const yourName = data?.user?.name || '';

  return (
    <>
      {status === 'loading' && (
        <div className='flex h-full w-full flex-col items-center justify-center rounded-xl  bg-light-primary dark:bg-dark-primary'>
          <Spinner />
          <div className=''>Getting your stream 🚀</div>
        </div>
      )}
      {status === 'rejected' && (
        <div className='flex h-full w-full flex-col items-center justify-center bg-light-primary dark:bg-dark-primary'>
          <div className='text-xl'>Can not get your stream 😶‍🌫️</div>
        </div>
      )}
      {status === 'success' && stream && (
        <VideoContainer
          visible={visible}
          name={yourName}
          image={data?.user?.image || ''}
          stream={stream}
        >
          <PeerVideo stream={stream} isMe={true} />
        </VideoContainer>
      )}
    </>
  );
}
