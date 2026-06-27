import { prisma } from './db';
import type { Sentence, PitchData } from '@/types';

function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function parse(row: {
  id: string;
  date: string;
  level: string;
  english: string;
  koreanPronunciation: string;
  koreanTranslation: string;
  blankWord: string;
  pitchData: string;
  createdAt: Date;
}): Sentence {
  return {
    ...row,
    level: row.level as Sentence['level'],
    pitchData: JSON.parse(row.pitchData) as PitchData,
  };
}

export async function getTodaySentences(): Promise<Sentence[]> {
  const rows = await prisma.sentence.findMany({ where: { date: todayStr() } });
  return rows.map(parse);
}

export async function getSentenceByDateLevel(
  date: string,
  level: string
): Promise<Sentence | null> {
  const row = await prisma.sentence.findUnique({
    where: { date_level: { date, level } },
  });
  return row ? parse(row) : null;
}
