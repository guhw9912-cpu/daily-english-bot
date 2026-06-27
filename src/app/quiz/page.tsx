'use client';

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import type { Level } from '@/types';
import { LEVEL_LABEL } from '@/types';
import { useTodaySentences } from '@/hooks/useTodaySentences';

function isInAppBrowser() {
  if (typeof window === 'undefined') return false;
  return /KAKAO|kakaotalk|Line|Instagram|NAVER|FB_IAB|FBAN/i.test(navigator.userAgent);
}

function openInChrome() {
  const url = window.location.href;
  window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
}

const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced'];

const CORRECT_MSGS = [
  '오, 기억하고 있었네요. 의외인데요?',
  '맞혔어요. 근데 운 아니죠?',
  '딩동댕. 오늘 공부 다 했어요.',
];
const WRONG_MSGS = [
  '너 방구벌레야? 장구벌레야?',
  '이것도 몰라? 진짜 바보야?',
  '야, 원숭이도 세 번 보면 외운다고.',
  '이게 틀리면 영어 포기하는 게 나아.',
  '설마 이 단어 처음 봐? 오늘 첫날이야?',
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type State = 'question' | 'correct' | 'wrong';

function formatDate(d: Date): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}

function renderBlank(english: string, blankWord: string) {
  const idx = english.toLowerCase().indexOf(blankWord.toLowerCase());
  if (idx === -1) return <span>{english}</span>;
  return (
    <>
      <span>{english.slice(0, idx)}</span>
      <span className="inline-block w-24 h-9 border-2 border-[#2563EB] rounded-lg bg-[#F5F3EF] align-middle mx-1" />
      <span>{english.slice(idx + blankWord.length)}</span>
    </>
  );
}

export default function QuizPage() {
  const { sentences, loading } = useTodaySentences();
  const [activeLevel, setActiveLevel] = useState<Level>('intermediate');
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState<State>('question');
  const [msg, setMsg] = useState('');
  const [inApp, setInApp] = useState(false);

  useEffect(() => {
    setInApp(isInAppBrowser());
  }, []);

  function speak(text: string) {
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'ko-KR';
      utt.rate = 0.95;
      // Android Chrome: cancel() 후 paused 상태로 고착되는 버그 수정
      synth.resume();
      synth.speak(utt);
    } catch {}
  }

  const byLevel = Object.fromEntries(sentences.map((s) => [s.level, s])) as Record<Level, (typeof sentences)[number] | undefined>;
  const current = byLevel[activeLevel];

  function handleLevelChange(level: Level) {
    setActiveLevel(level);
    setAnswer('');
    setState('question');
  }

  async function handleSubmit() {
    if (!current || !answer.trim()) return;

    // iOS Safari: await 전에 user gesture 컨텍스트 안에서 TTS 잠금 해제
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        synth.speak(new SpeechSynthesisUtterance(' '));
      }
    } catch {}

    const today = new Date().toISOString().split('T')[0];
    const res = await fetch('/api/quiz/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: today, level: activeLevel, answer }),
    });
    const data = await res.json();
    if (data.correct) {
      const m = rand(CORRECT_MSGS);
      setMsg(m);
      setState('correct');
      speak(m);
    } else {
      const m = rand(WRONG_MSGS);
      setMsg(m);
      setState('wrong');
      speak(m);
    }
  }

  function handleRetry() {
    setAnswer('');
    setState('question');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header back={{ href: '/', label: '오늘의 문장' }} />
      {inApp && (
        <div className="w-full px-4 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between gap-3">
          <p className="text-sm text-amber-800">카카오톡 브라우저는 음성을 지원하지 않아요.</p>
          <button
            onClick={openInChrome}
            className="shrink-0 px-3 py-1.5 bg-amber-800 text-white text-xs font-semibold rounded-lg"
          >
            크롬으로 열기
          </button>
        </div>
      )}
      <main className="flex flex-col items-center gap-8 px-4 py-16">
        <p className="text-sm text-[#AEA9A0]">{formatDate(new Date())}</p>

        {/* 수준 탭 */}
        <div className="flex gap-1 p-1 bg-[#EDEAE3] rounded-xl">
          {LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
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

        {loading && <p className="text-[#AEA9A0]">불러오는 중...</p>}

        {!loading && !current && (
          <p className="text-[#AEA9A0]">오늘의 문장이 아직 준비 중이에요. 홈으로 돌아가서 기다려봐요.</p>
        )}

        {!loading && current && (
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_8px_32px_rgba(26,23,20,0.1)]">
            {/* 문제 영역 */}
            <div className="px-12 pt-11 pb-9 flex flex-col gap-6">
              <p className="text-xs text-[#AEA9A0] tracking-wide">빈칸에 알맞은 단어를 입력하세요.</p>

              <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1714] leading-snug">
                &ldquo;{renderBlank(current.english, current.blankWord)}&rdquo;
              </p>

              <p className="text-sm text-[#AEA9A0]">힌트: {current.koreanTranslation}</p>

              {/* 정답/오답 결과 */}
              {state === 'correct' && (
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center gap-1 self-start px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    정답
                  </span>
                  <p className="text-base font-bold text-[#1A1714]">{msg}</p>
                </div>
              )}
              {state === 'wrong' && (
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center gap-1 self-start px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                    오답
                  </span>
                  <p className="text-base font-bold text-[#1A1714]">{msg}</p>
                  <div className="flex flex-col gap-1 px-5 py-4 bg-green-50 rounded-xl">
                    <span className="text-xs text-green-600 tracking-widest">정답</span>
                    <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1A1714]">
                      {current.blankWord}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-playfair)] text-lg text-[#6B6760]">
                    &ldquo;{current.english}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-[#EEE9DF]" />

            {/* 입력 + 버튼 */}
            <div className="px-12 pt-7 pb-11 flex flex-col gap-3">
              {state === 'question' && (
                <>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="정답 입력..."
                    className="w-full h-13 px-5 bg-[#F5F3EF] rounded-xl border border-[#D4D0C8] text-[#1A1714] placeholder:text-[#C4C0B8] text-base outline-none focus:border-[#2563EB] transition-colors"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-full h-13 bg-[#1A1714] text-white rounded-[14px] text-base font-semibold hover:bg-[#2d2926] transition-colors"
                  >
                    제출하기
                  </button>
                </>
              )}

              {state === 'correct' && (
                <Link
                  href="/"
                  className="w-full h-13 flex items-center justify-center bg-[#1A1714] text-white rounded-[14px] text-base font-semibold hover:bg-[#2d2926] transition-colors"
                >
                  오늘의 문장으로 돌아가기
                </Link>
              )}

              {state === 'wrong' && (
                <>
                  <button
                    onClick={() => {}}
                    className="w-full h-13 bg-[#FEF3C7] text-[#92400E] rounded-[14px] text-base font-semibold hover:bg-[#fde68a] transition-colors"
                  >
                    오답노트에 추가하기
                  </button>
                  <button
                    onClick={handleRetry}
                    className="w-full h-13 bg-[#1A1714] text-white rounded-[14px] text-base font-semibold hover:bg-[#2d2926] transition-colors"
                  >
                    다시 풀기
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
