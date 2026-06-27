import type { Sentence } from '@/types';
import { LEVEL_LABEL, LEVEL_STARS } from '@/types';
import { PitchGraph } from './PitchGraph';
import { TtsButton } from './TtsButton';

export function SentenceCard({ sentence }: { sentence: Sentence }) {
  const stars = LEVEL_STARS[sentence.level];
  const label = LEVEL_LABEL[sentence.level];

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_8px_32px_rgba(26,23,20,0.1)]">
      <div className="px-12 pt-11 pb-9 flex flex-col gap-5">
        {/* 난이도 별점 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-lg ${i < stars ? 'text-[#F59E0B]' : 'text-[#E0DBCF]'}`}>
              ★
            </span>
          ))}
          <span className="text-xs text-[#AEA9A0] ml-1">{label}</span>
        </div>

        {/* 영어 문장 + TTS */}
        <div className="flex items-start gap-2">
          <p className="font-[family-name:var(--font-playfair)] text-[2.2rem] font-bold text-[#1A1714] leading-tight">
            &ldquo;{sentence.english}&rdquo;
          </p>
          <TtsButton text={sentence.english} />
        </div>

        {/* 한국어 발음 */}
        <p className="text-[#8A8478] text-base">{sentence.koreanPronunciation}</p>

        {/* 억양 그래프 */}
        <PitchGraph data={sentence.pitchData} />
      </div>

      <div className="border-t border-[#EEE9DF]" />

      <div className="px-12 pt-8 pb-11 flex flex-col gap-1">
        <span className="text-xs text-[#AEA9A0] tracking-widest">뜻</span>
        <p className="text-[#1A1714] text-2xl font-bold">{sentence.koreanTranslation}</p>
      </div>
    </div>
  );
}
