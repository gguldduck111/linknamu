import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김선정 | 링크나무",
  description: "나의 모든 이야기가 모이는 곳. 링크나무에서 만나보세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))}catch(e){}})()` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
