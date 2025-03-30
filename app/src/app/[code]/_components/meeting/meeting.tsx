'use client';

import { useShallow } from 'zustand/react/shallow';
import { useMeeting } from '@/hooks/state/use-meeting';
import { VideoContainer } from '../containers';
import StreamsContainer from '../containers/streams-container';
import JoinRequestsDialog from '../dialogs/join-requests-dialog';
import PeerVideo from '../peer/peer-video';
import { MyStream } from '../streams';

export default function Meeting() {
  const { streamsList, visibleList, namesList, imagesList } = useMeeting(
    useShallow((state) => ({
      streamsList: state.streamsList,
      mutedList: state.mutedList,
      visibleList: state.visibleList,
      namesList: state.namesList,
      imagesList: state.imagesList,
    }))
  );

  return (
    <>
      <StreamsContainer count={Object.keys(streamsList).length + 1}>
        <MyStream />
        {Object.entries(streamsList).map(([peerId, stream]) => (
          <VideoContainer
            key={peerId}
            visible={visibleList[peerId]}
            image={imagesList[peerId]}
            stream={stream}
            name={namesList[peerId]}
          >
            <PeerVideo stream={stream} />
          </VideoContainer>
        ))}
      </StreamsContainer>
      <JoinRequestsDialog />
    </>
  );
}
