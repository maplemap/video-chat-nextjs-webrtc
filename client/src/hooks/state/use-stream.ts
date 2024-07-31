import { Nullable, StreamStatus } from "@/types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  stream: Nullable<MediaStream>;
  status: StreamStatus;
  visible: boolean;
  muted: boolean;
};

type Actions = {
  setStream: (stream: Nullable<MediaStream>) => void;
  setStatus: (status: StreamStatus) => void;
  setVisible: (visible: boolean) => void;
  setMuted: (muted: boolean) => void;
  reset: () => void;
  getStream: () => void;
  toggleVideo: (cb?: unknown) => void;
  toggleAudio: () => void;
};

export const useStream = create<State & Actions>()(
  immer((set) => ({
    stream: null,
    status: "loading",
    visible: true,
    muted: false,
    setStream: (stream) =>
      set((state) => {
        state.stream = stream;
      }),
    setStatus: (status) =>
      set((state) => {
        state.status = status;
      }),
    setVisible: (visible) =>
      set((state) => {
        state.visible = visible;
      }),
    setMuted: (muted) =>
      set((state) => {
        state.muted = muted;
      }),
    reset: () =>
      set((state) => {
        state.stream = null;
        state.status = "loading";
        state.visible = true;
        state.muted = false;
      }),
    getStream: () =>
      set(async ({ stream, muted, visible, setStream, setStatus }) => {
        if (stream) return;
        console.log("Getting stream");
        try {
          const newstream = await navigator.mediaDevices.getUserMedia({
            audio: !muted,
            video: visible,
          });
          setStream(newstream);
          setStatus("success");
          console.log("Stream is ready");
        } catch (error) {
          setStatus("rejected");
          console.error("Access denied for audio and video stream", error);
        }
      }),
    toggleAudio: () =>
      set(async ({ stream, setMuted }) => {
        if (!stream) throw new Error("Failed. Could not find stream");

        const track = stream.getAudioTracks()[0];
        if (!track)
          throw new Error(`Failed. Could not find audio track in given stream`);
        if (track.enabled) {
          track.enabled = false;
          setMuted(true);
        } else {
          track.enabled = true;
          setMuted(false);
        }
      }),
    toggleVideo: (cb) =>
      set(async ({ stream, muted, setVisible }) => {
        if (!stream) throw new Error("There is no a video stream to toggle");

        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack && videoTrack.readyState === "live") {
          videoTrack.enabled = false;
          videoTrack.stop(); // вимикаємо світловий індикатор на камері
          setVisible(false);
        } else {
          const newStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: !muted,
          });
          const newVideoTrack = newStream.getVideoTracks()[0];

          if (typeof cb === "function") {
            cb(newVideoTrack);
          }
          stream.removeTrack(videoTrack);
          stream.addTrack(newVideoTrack);
          setVisible(true);
        }
      }),
  })),
);
