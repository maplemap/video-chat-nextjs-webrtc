import { MediaConnection } from 'peerjs';
import { Socket as ClientSocket } from 'socket.io-client';
import type { Actions, State } from '../hooks/state/use-meeting';

export type Code = string;
export type Nullable<T> = T | null;
export type PeerId = string;
export type KeyValue<T> = Record<string, T>;
export type PeerUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  peerId: PeerId;
  muted: boolean;
  visible: boolean;
};
export type PeerUserWithSocketId = { socketId: string } & PeerUser;
export type PeerConnection = {
  stream: MediaStream;
  connection: MediaConnection;
} & PeerUser;
export type MediaKind = 'audio' | 'video';
export type StreamStatus = 'loading' | 'rejected' | 'success';

export type JoinStatus =
  | 'idle'
  | 'loading'
  | 'rejected'
  | 'accepted'
  | 'wait-for-owner'
  | 'room-is-full';

export interface ClientToServerEvents {
  'user:join-request': (params: {
    code: Code;
    user: PeerUser;
    ownerId: string;
  }) => void;
  'user:accepted': (params: { code: Code; user: PeerUserWithSocketId }) => void;
  'user:rejected': (params: { code: Code; user: PeerUserWithSocketId }) => void;
  'meeting:join': (params: { code: Code; user: PeerUser }) => void;
  'user:toggle-audio': (peerId: PeerId) => void;
  'user:toggle-video': (peerId: PeerId) => void;
}
export interface ServerToClientEvents {
  'meeting:full': () => void;
  'user:wait-for-owner': () => void;
  'user:left': (peerId: PeerId) => void;
  'user:accepted': (params: { code: Code; user: PeerUser }) => void;
  'user:rejected': (params: { code: Code; user: PeerUser }) => void;
  'user:join-request': (user: PeerUserWithSocketId) => void;
  'user:joined': (user: PeerUser) => void;
  'user:toggled-audio': (peerId: PeerId) => void;
  'user:toggled-video': (peerId: PeerId) => void;
}

export type Socket = ClientSocket<ServerToClientEvents, ClientToServerEvents>;

export type ZustandSelector<T = unknown> = (state: State & Actions) => T;
