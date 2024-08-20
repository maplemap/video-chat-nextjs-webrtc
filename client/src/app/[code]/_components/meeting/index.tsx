"use client";

import { VideoContainer } from "../containers";
import StreamsContainer from "../containers/streams-container";
import JoinRequestsDialog from "../dialogs/join-requests-dialog";
import { MyStream } from "../streams";
import PeerVideo from "../peer/index";
import { useMeeting } from "@/hooks/state/use-meeting";
import { useShallow } from "zustand/react/shallow";

export default function Meeting() {
  const { streamsList, mutedList, visibleList, namesList, imagesList } =
    useMeeting(
      useShallow((state) => ({
        streamsList: state.streamsList,
        mutedList: state.mutedList,
        visibleList: state.visibleList,
        namesList: state.namesList,
        imagesList: state.imagesList,
      })),
    );
  return (
    <>
      <StreamsContainer count={Object.keys(streamsList).length + 1}>
        <MyStream />
        {Object.entries(streamsList).map(([peerId, stream]) => (
          <VideoContainer
            key={peerId}
            muted={mutedList[peerId]}
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
