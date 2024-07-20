'use client';

import { useState } from 'react';
import Lobby from '@/app/[code]/_components/lobby';
import Meeting from '@/app/[code]/_components/meeting';
import { Code } from '@/types';

type Props = {
  params: { code: Code };
};

export default function MeetingPage({ params: { code } }: Props) {
  const [isLobby, setIsLobby] = useState(true);

  return isLobby ? <Lobby /> : <Meeting />;
}
