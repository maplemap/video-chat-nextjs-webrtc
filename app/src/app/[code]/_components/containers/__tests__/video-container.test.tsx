import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@/lib/test';
import VideoContainer from '../video-container';

const onCallbacks: Record<string, () => void> = {};

vi.mock('hark', () => ({
  default: vi.fn(() => ({
    on: (event: string, cb: () => void) => {
      onCallbacks[event] = cb;
    },
    stop: vi.fn(),
  })),
}));

const mockStream = {} as MediaStream;

describe('VideoContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when visible is true', () => {
    render(
      <VideoContainer visible name='John Doe' stream={mockStream} image=''>
        <div>Video content</div>
      </VideoContainer>
    );

    expect(screen.getByText('Video content')).toBeInTheDocument();
  });

  it('should render avatar fallback when visible is false', () => {
    render(
      <VideoContainer
        visible={false}
        name='John Doe'
        stream={mockStream}
        image=''
      >
        <div>Video content</div>
      </VideoContainer>
    );

    const hiddenContainer = screen.getByText('Video content').parentElement;

    expect(hiddenContainer).toHaveClass('hidden');
  });

  it('should add blue border when speaking is true', async () => {
    const { container } = render(
      <VideoContainer visible name='Jane Smith' stream={mockStream} image=''>
        <div>Video content</div>
      </VideoContainer>
    );
    await act(async () => {
      onCallbacks['speaking']?.();
    });

    const root = container.firstChild as HTMLElement;

    expect(root.className).toContain('border-blue-500');
  });
});
