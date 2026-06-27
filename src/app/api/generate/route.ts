import { NextResponse } from 'next/server';

// TODO: ANTHROPIC_API_KEY 설정 후 Claude API 연동
export async function POST() {
  return NextResponse.json({ message: 'Claude API 연동 예정' }, { status: 501 });
}
