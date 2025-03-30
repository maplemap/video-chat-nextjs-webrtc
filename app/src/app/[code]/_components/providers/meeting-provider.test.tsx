import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/lib/test';
import { PeerUserWithSocketId, ZustandSelector } from '../../../../types';
import MeetingProvider from './meeting-provider';

const mockConnect = vi.fn();
const mockDisconnect = vi.fn();
const mockEmit = vi.fn();
const mockOn = vi.fn();
const mockOff = vi.fn();

vi.mock('@/hooks/state/use-socket', () => ({
  useSocket: () => ({
    connect: mockConnect,
    disconnect: mockDisconnect,
    emit: mockEmit,
    on: mockOn,
    off: mockOff,
  }),
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

vi.mock('@/hooks/state/use-meeting', () => {
  return {
    useMeeting: (selector: ZustandSelector) =>
      selector({
        meeting: null,
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

vi.mock('@/hooks/state/use-stream', () => ({
  useStream: () => ({
    stream: {},
    muted: false,
    visible: true,
  }),
}));

vi.mock('@/hooks/state/use-peer', () => ({
  usePeer: () => ({
    peer: {
      on: vi.fn(),
      off: vi.fn(),
    },
    myPeerId: 'peer-1',
    setMyPeerId: vi.fn(),
    setPeer: vi.fn(),
  }),
}));

vi.mock('@/hooks/state/use-recent-meetings', () => ({
  useRecentMeetings: () => ({
    addMeeting: vi.fn(),
  }),
}));

vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        image: '',
      },
    },
  }),
}));

describe('MeetingProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('should render children and connect socket on mount', () => {
    render(
      <MeetingProvider joinMeeting={vi.fn()}>
        <div>Meeting Content</div>
      </MeetingProvider>
    );

    expect(screen.getByText('Meeting Content')).toBeInTheDocument();
    expect(mockOn).toHaveBeenCalledWith(
      'user:wait-for-owner',
      expect.any(Function)
    );
  });
});
