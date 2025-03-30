import toast from 'react-hot-toast';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, userEvent } from '@/lib/test';
import { PeerUserWithSocketId, ZustandSelector } from '../../../../types';
import ControlPanel from './control-panel';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockEmit = vi.fn();
vi.mock('@/hooks/state/use-socket', () => ({
  useSocket: () => ({ emit: mockEmit }),
}));

vi.mock('@/hooks/state/use-peer', () => ({
  usePeer: () => 'peer-1',
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/hooks/state/use-stream', () => ({
  useStream: () => ({
    muted: false,
    visible: true,
    toggleAudio: vi.fn(),
    toggleVideo: vi.fn((cb: (track: MediaStreamTrack) => void) => {
      const track = { kind: 'video' } as MediaStreamTrack;
      cb(track);
    }),
  }),
}));

vi.mock('@/components/navbar/time', () => ({
  default: () => <div>Time</div>,
}));

vi.mock('usehooks-ts', () => ({
  useCopyToClipboard: () => [null, vi.fn(() => Promise.resolve())],
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

describe('ControlPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render meeting code and copy icon', () => {
    render(<ControlPanel />);

    expect(screen.getByText('abc123...')).toBeInTheDocument();
    expect(screen.getByRole('copy-icon')).toBeInTheDocument();
  });

  it('should emit toggle audio on click', async () => {
    render(<ControlPanel />);
    const micBtn = screen.getByRole('toggle-audio-button');
    await userEvent.click(micBtn);

    expect(mockEmit).toHaveBeenCalledWith('user:toggle-audio', 'peer-1');
  });

  it('should emit toggle video and replace track on click', async () => {
    render(<ControlPanel />);
    const videoBtn = screen.getByRole('toggle-video-button');
    await userEvent.click(videoBtn);

    expect(mockEmit).toHaveBeenCalledWith('user:toggle-video', 'peer-1');
  });

  it('should navigate to home when exit button is clicked', async () => {
    render(<ControlPanel />);
    const exitBtn = screen.getAllByRole('button')[0];
    await userEvent.click(exitBtn);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should copy meeting code when clicked', async () => {
    render(<ControlPanel />);
    await userEvent.click(screen.getByRole('copy-icon'));

    expect(toast.success).toHaveBeenCalledWith('Copied!');
  });
});
