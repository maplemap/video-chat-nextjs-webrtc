"use client";

import Time from "@/components/navbar/time";
import { Button } from "@/components/ui/button";
import { useMeeting } from "@/hooks/state/use-meeting";
import { usePeer } from "@/hooks/state/use-peer";
import { useSocket } from "@/hooks/state/use-socket";
import { useStream } from "@/hooks/state/use-stream";
import { MediaKind } from "@/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LuCopy,
  LuMic,
  LuMicOff,
  LuPhoneOff,
  LuVideo,
  LuVideoOff,
} from "react-icons/lu";
import { useCopyToClipboard } from "usehooks-ts";
import { useShallow } from "zustand/react/shallow";

export default function ControlPanel() {
  const { muted, visible, toggleAudio, toggleVideo } = useStream();
  const { meeting, connections } = useMeeting(
    useShallow((state) => ({
      meeting: state.meeting,
      connections: state.connections,
    })),
  );
  const [copiedText, copy] = useCopyToClipboard();
  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast.success("Copied!");
      })
      .catch((error) => {
        toast.error("Failed to copy!");
      });
  };
  const router = useRouter();
  const socket = useSocket();
  const myPeerId = usePeer((state) => state.myPeerId);
  const toggle = (kind: MediaKind) => {
    switch (kind) {
      case "audio":
        toggleAudio();
        socket.emit("user:toggle-audio", myPeerId);
        break;
      case "video":
        toggleVideo((newTrack: MediaStreamTrack) => {
          Object.values(connections).forEach((el) => {
            const sender = el.peerConnection?.getSenders().find((s) => {
              return s.track?.kind === newTrack.kind;
            });
            sender?.replaceTrack(newTrack);
          });
        });
        socket.emit("user:toggle-video", myPeerId);
        break;
      default:
        break;
    }
  };
  return (
    <div className="h-[10vh] px-3 pb-3">
      <div className="grid h-full w-full grid-cols-[1.5fr,1fr] items-center rounded-xl bg-light-primary px-3 dark:bg-dark-primary md:grid-cols-3">
        <Time className="hidden md:block" />
        <div className="flex items-center justify-center gap-x-3">
          <Button
            size="icon"
            variant={"red"}
            onClick={() => {
              router.push("/");
            }}
          >
            <LuPhoneOff className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            onClick={() => {
              toggle("audio");
            }}
          >
            {muted ? (
              <LuMicOff className="h-6 w-6" />
            ) : (
              <LuMic className="h-6 w-6" />
            )}
          </Button>
          <Button
            size="icon"
            onClick={() => {
              toggle("video");
            }}
          >
            {visible ? (
              <LuVideo className="h-6 w-6" />
            ) : (
              <LuVideoOff className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div
          onClick={() => handleCopy(meeting?.code as string)}
          className="flex cursor-pointer items-center gap-x-2 justify-self-end"
        >
          <LuCopy />
          <span className="hidden md:block">{meeting?.code}</span>
          <span className="md:hidden">{`${meeting?.code.slice(0, 6)}...`}</span>
        </div>
      </div>
    </div>
  );
}
