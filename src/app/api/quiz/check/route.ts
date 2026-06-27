import { NextRequest, NextResponse } from 'next/server';
import { getSentenceByDateLevel } from '@/lib/sentence';

export async function POST(req: NextRequest) {
  const { date, level, answer } = await req.json();
  const sentence = await getSentenceByDateLevel(date, level);
  if (!sentence) {
    return NextResponse.json({ error: '문장을 찾을 수 없어요.' }, { status: 404 });
  }
  const correct = sentence.blankWord.toLowerCase().trim() === answer.toLowerCase().trim();
  return NextResponse.json({ correct, blankWord: sentence.blankWord });
}
