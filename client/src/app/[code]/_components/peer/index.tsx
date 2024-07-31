"use client";

import { memo } from "react";

const PeerVideo = ({
  stream,
  isMe,
}: {
  stream: MediaStream;
  isMe?: boolean;
}) => {
  return (
    <div className="flex h-full items-center justify-center overflow-hidden rounded-xl bg-light-primary dark:bg-dark-primary">
      <video
        ref={(node) => {
          if (node) node.srcObject = stream;
        }}
        autoPlay
        muted={isMe}
        className="aspect-video h-full -scale-x-100 object-contain"
      />
    </div>
  );
};

export default memo(PeerVideo);
