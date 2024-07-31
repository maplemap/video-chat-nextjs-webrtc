'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  joinMeeting: () => void;
};
export const MeetingProvider = ({ children, joinMeeting }: Props) => {
  return <div>{children}</div>;
};
