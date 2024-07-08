'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MAX_CODE_LENGTH = 18;

export function JoinMeetingWidget() {
  const [code, setCode] = useState('');

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[3fr,1fr]">
        <Input
          placeholder="Enter meeting code"
          maxLength={MAX_CODE_LENGTH}
          className="h-14 sm:rounded-2xl"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button className="sm:rounded-2xl">Join</Button>
      </div>
      <div className="ml-2 mt-1">
        {code.length}/{MAX_CODE_LENGTH}
      </div>
    </>
  );
}
