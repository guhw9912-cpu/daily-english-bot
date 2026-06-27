import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const today = new Date().toISOString().split('T')[0];

const sentences = [
  {
    date: today,
    level: 'beginner',
    english: 'Nice to meet you.',
    koreanPronunciation: '나이스 투 밋 유.',
    koreanTranslation: '만나서 반가워요.',
    blankWord: 'meet',
    pitchData: JSON.stringify({
      kr: ['나이스', '투', '밋', '유'],
      en: ['Nice', 'to', 'meet', 'you'],
      values: [3, 2, 4, 2],
    }),
  },
  {
    date: today,
    level: 'intermediate',
    english: "I'll keep that in mind.",
    koreanPronunciation: '아일 킵 댓 인 마인드.',
    koreanTranslation: '명심할게요.',
    blankWord: 'keep',
    pitchData: JSON.stringify({
      kr: ['아일', '킵', '댓', '인', '마인드'],
      en: ["I'll", 'keep', 'that', 'in', 'mind'],
      values: [3, 5, 2, 2, 4],
    }),
  },
  {
    date: today,
    level: 'advanced',
    english: "Don't take it for granted.",
    koreanPronunciation: '돈 테이킷 포 그랜티드.',
    koreanTranslation: '당연하게 여기지 마세요.',
    blankWord: 'granted',
    pitchData: JSON.stringify({
      kr: ['돈', '테이킷', '포', '그랜티드'],
      en: ["Don't", 'take', 'for', 'granted'],
      values: [4, 5, 3, 2],
    }),
  },
];

async function main() {
  for (const s of sentences) {
    await prisma.sentence.upsert({
      where: { date_level: { date: s.date, level: s.level } },
      update: s,
      create: s,
    });
  }
  console.log('Seed 완료:', today);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
