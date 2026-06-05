import type { Metadata } from 'next';
import { Barlow } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SplashWrapper from '@/components/SplashWrapper';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Asinu Kumarage | Creative Developer',
  description: 'Portfolio of Asinu Kumarage – Software Engineer passionate in architecture & UI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <SplashWrapper>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
        </SplashWrapper>
      </body>
    </html>
  );
}
