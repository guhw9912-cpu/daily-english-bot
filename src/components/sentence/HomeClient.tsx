'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Sentence, Level } from '@/types';
import { LEVEL_LABEL } from '@/types';
import { SentenceCard } from './SentenceCard';

const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];

export function HomeClient({ sentences }: { sentences: Sentence[] }) {
  const [activeLevel, setActiveLevel] = useState<Level>('intermediate');

  const byLevel = Object.fromEntries(sentences.map((s) => [s.level, s])) as Record<Level, Sentence | undefined>;
  const current = byLevel[activeLevel];

  if (sentences.length === 0) {
    return (
      <p className="text-[#AEA9A0] text-center py-20">
        오늘의 문장이 아직 준비 중이에요. 잠깐만요.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 수준 탭 */}
      <div className="flex gap-1 p-1 bg-[#EDEAE3] rounded-xl">
        {LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-5 py-2 rounded-[9px] text-sm font-medium transition-all ${
              activeLevel === level
                ? 'bg-white text-[#1A1714] shadow-sm font-semibold'
                : 'text-[#8A8478] hover:text-[#6B6760]'
            }`}
          >
            {LEVEL_LABEL[level]}
          </button>
        ))}
      </div>

      {/* 문장 카드 */}
      {current ? (
        <SentenceCard sentence={current} />
      ) : (
        <p className="text-[#AEA9A0]">문장을 불러오지 못했어요. 새로고침 해보세요.</p>
      )}

      {/* 퀴즈 버튼 */}
      <Link
        href="/quiz"
        className="w-full max-w-2xl flex items-center justify-center h-14 bg-[#1A1714] text-white rounded-[14px] text-base font-semibold tracking-wide hover:bg-[#2d2926] transition-colors"
      >
        오늘의 문제 풀기 →
      </Link>
    </div>
  );
}
