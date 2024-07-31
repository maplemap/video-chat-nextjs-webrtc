"use client";

import StreamsContainer from "../containers/streams-container";
import { MyStream } from "../streams";

export default function Meeting() {
  return (
    <StreamsContainer count={1}>
      <MyStream />
      {/* Other streams */}
    </StreamsContainer>
  );
}
