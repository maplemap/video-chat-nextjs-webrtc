import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, userEvent } from '@/lib/test';
import { PeerUserWithSocketId, ZustandSelector } from '../../../../types';
import Lobby from './lobby';

vi.mock('@/hooks/state/use-stream', () => ({
  useStream: () => ({
    stream: true,
    status: 'success',
    muted: false,
    visible: true,
    getStream: vi.fn(),
    toggleAudio: vi.fn(),
    toggleVideo: vi.fn(),
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

const mockEmit = vi.fn();
vi.mock('@/hooks/state/use-socket', () => ({
  useSocket: () => ({ emit: mockEmit }),
}));

vi.mock('@/hooks/state/use-peer', () => ({
  usePeer: () => 'peer-1',
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

vi.mock('@/components/navbar', () => ({ default: () => <div>Navbar</div> }));
vi.mock('../streams', () => ({
  MyStream: () => <div>MyStream</div>,
}));

describe('Lobby', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render `Join` button when stream is ready', () => {
    render(<Lobby />);

    expect(screen.getByText('Join')).toBeInTheDocument();
    expect(screen.getByText('Test User (YOU)')).toBeInTheDocument();
  });

  it('should emit join request when join is clicked', async () => {
    render(<Lobby />);
    await userEvent.click(screen.getByRole('join-button'));

    expect(mockEmit).toHaveBeenCalledWith('user:join-request', {
      code: 'abc123',
      ownerId: 'owner-1',
      user: {
        peerId: 'peer-1',
        id: 'user-1',
        email: 'test@example.com',
        name: 'Test User',
        image: '',
        muted: false,
        visible: true,
      },
    });
  });
});
