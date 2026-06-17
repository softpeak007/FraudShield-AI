import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'AI Fraud & Case Monitor',
  description: 'Enterprise-grade B2B Fraud Detection, Risk Intelligence, and Case Management platform with Elite AI Copilot.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
