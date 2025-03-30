import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, userEvent } from '@/lib/test';
import { PeerUserWithSocketId, ZustandSelector } from '@/types';
import JoinRequestsDialog from './join-requests-dialog';

vi.mock('next/navigation', () => ({
  useParams: () => ({ code: 'test-room' }),
}));

const mockEmit = vi.fn();
vi.mock('@/hooks/state/use-socket', () => ({
  useSocket: () => ({
    emit: mockEmit,
  }),
}));

const mockRemoveJoinRequest = vi.fn();
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
        removeJoinRequest: mockRemoveJoinRequest,
        addConnection: vi.fn(),
        removeConnection: vi.fn(),
        setPeerMuted: vi.fn(),
        setPeerVisible: vi.fn(),
        reset: vi.fn(),
      }),
  };
});

describe('JoinRequestsDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render user join request', () => {
    render(<JoinRequestsDialog />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByRole('accept-button')).toBeInTheDocument();
  });

  it('should emit accept event and remove user on accept', async () => {
    render(<JoinRequestsDialog />);

    const acceptButton = screen.getByRole('accept-button');
    await userEvent.click(acceptButton);

    expect(mockEmit).toHaveBeenCalledWith('user:accepted', {
      user: mockUser,
      code: 'test-room',
    });

    expect(mockRemoveJoinRequest).toHaveBeenCalledWith('peer-1');
  });

  it('should emit reject event and remove user on reject', async () => {
    render(<JoinRequestsDialog />);

    const rejectButton = screen.getByRole('reject-button');
    await userEvent.click(rejectButton);

    expect(mockEmit).toHaveBeenCalledWith('user:rejected', {
      user: mockUser,
      code: 'test-room',
    });

    expect(mockRemoveJoinRequest).toHaveBeenCalledWith('peer-1');
  });
});
