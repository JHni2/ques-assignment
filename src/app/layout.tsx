import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Recoil from '@/components/Recoil';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '400', '700', '900'],
});

export const metadata: Metadata = {
  title: 'My own diary',
  description: '오늘의 날씨를 확인하고, 여러 할 일을 작성해보세요!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <Recoil>
        <body className={notoSansKr.className}>
          {children}
          <div id="portal" />
        </body>
      </Recoil>
    </html>
  );
}
