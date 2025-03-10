type PeerId = string;
type Code = string;
export type KeyValue<T> = Record<string, T>;
type PeerUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  peerId: PeerId;
  muted: boolean;
  visible: boolean;
};
type PeerUserWithSocketId = { socketId: string } & PeerUser;

export interface ClientToServerEvents {
  "user:join-request": ({}: {
    code: Code;
    user: PeerUser;
    ownerId: string;
  }) => void;
  "user:accepted": ({}: { code: Code; user: PeerUserWithSocketId }) => void;
  "user:rejected": ({}: { code: Code; user: PeerUserWithSocketId }) => void;
  "meeting:join": ({}: { code: Code; user: PeerUser }) => void;
  "user:toggle-audio": (peerId: PeerId) => void;
  "user:toggle-video": (peerId: PeerId) => void;
}
export interface ServerToClientEvents {
  "meeting:full": () => void;
  "user:wait-for-owner": () => void;
  "user:left": (peerId: PeerId) => void;
  "user:accepted": ({}: { code: Code; user: PeerUser }) => void;
  "user:rejected": ({}: { code: Code; user: PeerUser }) => void;
  "user:join-request": (user: PeerUserWithSocketId) => void;
  "user:joined": (user: PeerUser) => void;
  "user:toggled-audio": (peerId: PeerId) => void;
  "user:toggled-video": (peerId: PeerId) => void;
}
