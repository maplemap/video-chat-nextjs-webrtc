import { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/lib/test';
import { PeerUserWithSocketId, ZustandSelector } from '@/types';
import Meeting from './meeting';

vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  AvatarImage: ({ src }: { src: string }) => <img src={src} alt='avatar' />,
  AvatarFallback: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../streams', () => ({
  MyStream: () => <div>MyStream</div>,
}));

vi.mock('../peer/index', () => ({
  default: ({ stream }: { stream: MediaStream }) => <div>{stream.id}</div>,
}));

vi.mock('../containers/streams-container', () => ({
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='streams-container'>{children}</div>
  ),
}));

vi.mock('../dialogs/join-requests-dialog', () => ({
  default: () => <div>JoinRequestsDialog</div>,
}));

const mockUser: PeerUserWithSocketId = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
  image: '',
  peerId: 'peer-1',
  muted: false,
  visible: true,
  socketId: 'socket-123',
};

const mockMeeting = {
  id: 'meeting-1',
  code: 'abc123',
  name: 'Test Meeting',
  ownerId: 'owner-1',
  createdAt: new Date(),
};

vi.mock('@/hooks/state/use-meeting', () => {
  return {
    useMeeting: (selector: ZustandSelector) =>
      selector({
        meeting: mockMeeting,
        joinStatus: 'idle',
        joinRequests: [mockUser],
        connections: {},
        streamsList: {},
        mutedList: {},
        visibleList: {},
        namesList: {},
        imagesList: {},
        setMeeting: vi.fn(),
        setJoinStatus: vi.fn(),
        addJoinRequest: vi.fn(),
        removeJoinRequest: vi.fn(),
        addConnection: vi.fn(),
        removeConnection: vi.fn(),
        setPeerMuted: vi.fn(),
        setPeerVisible: vi.fn(),
        reset: vi.fn(),
      }),
  };
});

describe('Meeting', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should render MyStream and peer video containers', () => {
    render(<Meeting />);

    expect(screen.getByText('MyStream')).toBeInTheDocument();
    expect(screen.getByText('JoinRequestsDialog')).toBeInTheDocument();
  });
});
