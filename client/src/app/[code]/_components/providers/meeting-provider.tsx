'use client';

import React, { useEffect } from 'react';
import { usePeer } from '@/hooks/state/use-peer';
import { useSocket } from '@/hooks/state/use-socket';

type Props = {
  children: React.ReactNode;
  joinMeeting: () => void;
};
export const MeetingProvider = ({ children, joinMeeting }: Props) => {
  const socket = useSocket();
  const { myPeerId, setPeer, setMyPeerId } = usePeer((state) => ({
    myPeerId: state.myPeerId,
    setMyPeerId: state.setMyPeerId,
    setPeer: state.setPeer,
  }));

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const peer = new (await import('peerjs')).default();
        setPeer(peer);

        peer.on('open', (peerId) => {
          setMyPeerId(peerId);
        });
        peer.on('error', (err) => {
          console.log('Failed to setup peer connection', err);
        });
      } catch (err) {
        console.log('Unable to create a peer');
      }
    })();
  }, [setMyPeerId, setPeer]);

  return <div>{children}</div>;
};
