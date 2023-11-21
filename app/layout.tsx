import '@/app/ui/global.css';
import { montserrat } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Vercel Course</title>
      </head>
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
