"use client";

import Image from "next/image";
import { ArrowUpRight, BookOpen, Check, Copy, Github, Instagram, Moon, Sprout, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { links, profile } from "@/data/profile";

const icons = { github: Github, book: BookOpen, instagram: Instagram };

export function ProfilePage() {
  const [dark, setDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setMessage("프로필 링크를 복사했어요.");
    } catch {
      setMessage("주소창의 URL을 복사해 공유해 주세요.");
    }
  }

  function recordClick(id: string) {
    void fetch(`/api/links/${id}/click`, { method: "POST", keepalive: true }).catch(() => {});
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-7 sm:px-10">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight" aria-label="링크나무 홈">
          <Sprout className="text-emerald-600 dark:text-emerald-400" size={25} />링크나무
        </a>
        <button onClick={toggleTheme} className="icon-button" aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"} aria-pressed={dark}>
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-6 pb-16 pt-9 sm:pt-14">
        <section className="text-center" aria-labelledby="profile-name">
          <div className="relative mx-auto mb-6 w-fit">
            <Image src={profile.image} width={104} height={104} priority alt={`${profile.name} 프로필 아바타`} className="rounded-full ring-4 ring-white dark:ring-stone-800" />
            <span className="absolute -bottom-1 -right-1 rounded-full border-4 border-[#f7f8f4] bg-emerald-100 p-1.5 dark:border-stone-950" aria-hidden="true"><Sprout size={17} className="text-emerald-700" /></span>
          </div>
          <p className="mb-2 text-xs font-medium tracking-[0.15em] text-emerald-700 dark:text-emerald-400">A LITTLE SPACE OF MINE</p>
          <h1 id="profile-name" className="text-3xl font-bold tracking-tight">{profile.name}</h1>
          <p className="mt-2 text-sm text-stone-400">@{profile.handle}</p>
          <p className="mt-5 text-sm text-stone-600 dark:text-stone-300">{profile.bio}</p>
        </section>

        <nav aria-label="나의 링크" className="mt-10 space-y-3">
          {links.map((link) => {
            const Icon = icons[link.icon];
            return (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" onClick={() => recordClick(link.id)} className="link-card group">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f1f4ed] text-stone-700 dark:bg-stone-800 dark:text-stone-200"><Icon size={21} /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{link.title}</span><span className="mt-1 block text-xs leading-relaxed text-stone-500 dark:text-stone-400">{link.description}</span></span>
                <ArrowUpRight size={18} className="shrink-0 text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /><span className="sr-only">새 탭에서 열기</span>
              </a>
            );
          })}
        </nav>

        <div className="mt-9 text-center">
          <button onClick={share} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-stone-500 hover:bg-stone-200/50 dark:text-stone-400 dark:hover:bg-stone-800">
            {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "복사했어요!" : "프로필 링크 공유"}
          </button>
          <p role="status" className="mt-2 min-h-5 text-xs text-stone-500">{message}</p>
        </div>
      </main>
      <footer className="pb-7 text-center text-xs text-stone-400"><span className="mb-2 block">흩어진 링크를 모아, 하나의 나로.</span><span className="inline-flex items-center gap-1 font-medium"><Sprout size={13} /> made with 링크나무</span></footer>
    </div>
  );
}
