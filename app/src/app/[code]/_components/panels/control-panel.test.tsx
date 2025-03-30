import toast from 'react-hot-toast';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, userEvent } from '@/lib/test';
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

const mockConnections = {
  'peer-2': {
    peerConnection: {
      getSenders: () => [
        {
          track: { kind: 'video' },
          replaceTrack: vi.fn(),
        },
      ],
    },
  },
};

vi.mock('@/hooks/state/use-meeting', () => ({
  useMeeting: (selector: any) =>
    selector({
      meeting: {
        code: 'abc123xyz',
      },
      connections: mockConnections,
    }),
}));

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
