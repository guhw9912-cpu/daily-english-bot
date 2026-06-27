import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: '매일 영어 문장',
  description: '매일 하나씩, 부담 없이 영어를 접하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#F5F3EF] font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
