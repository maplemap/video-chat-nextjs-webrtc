"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { MyStream } from "../streams";
import { useEffect } from "react";
import { useStream } from "@/hooks/state/use-stream";
import { LuMic, LuMicOff, LuVideo, LuVideoOff } from "react-icons/lu";
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
            {status === "success" && (
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
                  )}{" "}
                </Button>
              </div>
            )}
          </div>
          <div className="grid place-content-center place-items-center gap-2 text-center">
            <Button onClick={handleJoin} size={"lg"}>
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
