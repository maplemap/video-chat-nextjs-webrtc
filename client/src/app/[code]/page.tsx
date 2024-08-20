"use client";

import { Code } from "@/types";
import { useEffect, useState } from "react";
import Lobby from "./_components/lobby";
import Meeting from "./_components/meeting";
import { useMeeting } from "@/hooks/state/use-meeting";
import getMeetingByCode from "@/actions/get/get-meeting-by-code";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Route } from "../../../routes";
import { Hearts } from "react-loader-spinner";
import { useShallow } from "zustand/react/shallow";
import { MeetingProvider } from "./_components/providers";

type Props = {
  params: { code: Code };
};
export default function MeetingPage({ params: { code } }: Props) {
  const [isLobby, setIsLobby] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { meeting, setMeeting } = useMeeting(
    useShallow((state) => ({
      meeting: state.meeting,
      setMeeting: state.setMeeting,
    })),
  );
  const router = useRouter();
  useEffect(() => {
    if (meeting) {
      setIsLoading(false);
      return;
    }
    getMeetingByCode(code).then((res) => {
      if (res) {
        setMeeting(res);
        setIsLoading(false);
      } else {
        toast.error("Meeting not found !");
        router.push(Route.MAIN);
      }
    });
  }, [code, meeting, setMeeting, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Hearts
          height="120"
          width="120"
          color="#4a8be0"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <MeetingProvider joinMeeting={() => setIsLobby(false)}>
      {isLobby ? <Lobby /> : <Meeting />}
    </MeetingProvider>
  );
}
