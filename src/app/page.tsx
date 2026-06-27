import { Header } from '@/components/layout/Header';
import { HomeClient } from '@/components/sentence/HomeClient';
import { getTodaySentences } from '@/lib/sentence';

function formatDate(d: Date): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${days[d.getDay()]}요일`;
}

export default async function HomePage() {
  const sentences = await getTodaySentences();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center gap-8 px-4 py-16">
        <p className="text-sm text-[#AEA9A0]">{formatDate(new Date())}</p>
        <HomeClient sentences={sentences} />
      </main>
    </div>
  );
}
