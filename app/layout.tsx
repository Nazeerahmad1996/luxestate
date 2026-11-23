import type { Metadata } from 'next';
import { Inter, Syncopate, Great_Vibes } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'], variable: '--f-body' });
const wide = Syncopate({ subsets: ['latin'], weight: '400', variable: '--f-wide' });
const script = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--f-script' });
export const metadata: Metadata = { title: 'LUXESTATE | Invest in Dubai', description: 'Dubai property investment.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${inter.variable} ${wide.variable} ${script.variable}`}><body>{children}</body></html>);
}
