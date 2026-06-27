import { NextResponse } from 'next/server';
import { getTodaySentences } from '@/lib/sentence';

export async function GET() {
  const sentences = await getTodaySentences();
  return NextResponse.json(sentences);
}
