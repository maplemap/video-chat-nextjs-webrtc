export type Code = string;
export type Nullable<T> = T | null;
export type MediaKind = "audio" | "video";
export type StreamStatus = "loading" | "rejected" | "success";
export type JoinStatus =
  | "idle"
  | "loading"
  | "rejected"
  | "accepted"
  | "wait-for-owner"
  | "room-is-full";
