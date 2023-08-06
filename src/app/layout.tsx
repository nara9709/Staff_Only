import { AuthContext } from '@/context/AuthContext';
import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import FooterNav from '@/components/FooterNav';
import { SWRContext } from '@/context/SWRContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '알바러들을 위한 커뮤니티 사이트',
    template: '알바러들을 위한 커뮤니티 사이트 | %s',
  },
  description: '알바생들을 위한 커뮤니티 사이트 | 알바달력',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="bg-gray-100  m-auto">
        <AuthContext>
          <header>
            <Header />
          </header>
          <SWRContext>
            <main className="overflow-auto  pt-16 pb-20">
              {children}
              <div id="portal"></div>
            </main>
          </SWRContext>
          <FooterNav />
        </AuthContext>
      </body>
    </html>
  );
}
