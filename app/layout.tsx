import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Refab Connect / AI-WOC',
  description: 'Structured Work Order Correction application build.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
