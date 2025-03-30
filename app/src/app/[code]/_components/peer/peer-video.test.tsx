import { describe, it, expect } from 'vitest';
import { render, screen } from '@/lib/test';
import PeerVideo from './peer-video';

const mockStream = new MediaStream();

describe('PeerVideo', () => {
  it('should render video element', () => {
    render(<PeerVideo stream={mockStream} isMe />);
    const video = screen.getByRole('video');

    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoPlay');
  });

  it('should mute video when isMe is true', () => {
    render(<PeerVideo stream={mockStream} isMe />);
    const video: HTMLVideoElement = screen.getByRole('video');

    expect(video.muted).toBe(true);
  });

  it('should render audio element', () => {
    render(<PeerVideo stream={mockStream} isMe />);
    const audio = screen.getByRole('audio');

    expect(audio).toBeInTheDocument();
    expect(audio).toHaveAttribute('autoPlay');
  });

  it('should mute audio when isMe is true', () => {
    render(<PeerVideo stream={mockStream} isMe />);
    const audio: HTMLAudioElement = screen.getByRole('audio');

    expect(audio.muted).toBe(true);
  });
});
