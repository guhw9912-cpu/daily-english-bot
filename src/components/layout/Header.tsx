import Link from 'next/link';

interface HeaderProps {
  back?: { href: string; label: string };
}

export function Header({ back }: HeaderProps) {
  return (
    <header className="w-full h-16 flex items-center justify-between px-16 bg-white border-b border-[#E8E4DC] shrink-0">
      <Link
        href="/"
        className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1714]"
      >
        매일 영어 문장
      </Link>
      {back ? (
        <Link href={back.href} className="text-sm text-[#6B6760] hover:text-[#1A1714] transition-colors">
          ← {back.label}
        </Link>
      ) : (
        <Link href="/history" className="text-sm text-[#6B6760] hover:text-[#1A1714] transition-colors">
          지난 문장 →
        </Link>
      )}
    </header>
  );
}
