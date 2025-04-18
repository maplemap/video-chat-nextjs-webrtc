'use client';

import { memo } from 'react';

const PeerVideo = ({
  stream,
  isMe = false,
}: {
  stream: MediaStream;
  isMe?: boolean;
}) => {
  return (
    <div className='flex h-full items-center justify-center overflow-hidden bg-light-primary dark:bg-dark-primary'>
      <video
        role='video'
        ref={(node) => {
          if (node) {
            node.srcObject = stream;
          }
        }}
        autoPlay
        muted={isMe}
        className='aspect-video h-full -scale-x-100 object-contain'
      />
      <audio
        role='audio'
        ref={(node) => {
          if (node) {
            node.srcObject = stream;
          }
        }}
        autoPlay
        muted={isMe}
        className='hidden'
      />
    </div>
  );
};

export default memo(PeerVideo);
