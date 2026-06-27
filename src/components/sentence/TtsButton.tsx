'use client';

import { Volume2 } from 'lucide-react';
import { useState } from 'react';

export function TtsButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);

  function speak() {
    if (!window.speechSynthesis || playing) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      onClick={speak}
      title={playing ? '재생 중...' : '발음 듣기'}
      className={`mt-1 shrink-0 transition-colors ${playing ? 'text-[#2563EB]' : 'text-[#B8B4AA] hover:text-[#6B6760]'}`}
    >
      <Volume2 size={24} />
    </button>
  );
}
