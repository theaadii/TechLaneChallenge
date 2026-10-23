import { DevFestMark } from "@/components/ui/event-logos";
import { SocialLinks } from "@/components/ui/social-links";
import { Wordmark } from "@/components/ui/wordmark";

export function Shell({ children, wide = false, fixedBar = false }: { children: React.ReactNode; wide?: boolean; fixedBar?: boolean }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full flex-col px-4 sm:px-6" style={{ maxWidth: wide ? "56rem" : "40rem" }}>
      <header className="flex items-center justify-between gap-3 py-4">
        <Wordmark />
        <DevFestMark className="h-9 sm:h-11" />
      </header>
      <main id="main" className="flex-1 pb-10">
        {children}
      </main>
      <footer className={`flex items-center justify-between gap-3 border-t-2 border-dashed border-ink/30 py-5${fixedBar ? " pb-28" : ""}`}>
        <p className="font-mono text-xs font-bold text-ink">© 2026 Deboistech. All rights reserved.</p>
        <SocialLinks />
      </footer>
    </div>
  );
}
