import Link from "next/link";

export type NavItem = {
  label: string;
  href: string;
};

export function SiteShell({
  children,
  navItems,
  languageSwitcher,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
  languageSwitcher?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-lake-mist text-stoneink">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/55 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="#home"
            className="shrink-0 font-display text-base tracking-[0.16em] text-stoneink/90 sm:text-xl sm:tracking-[0.2em]"
          >
            Rubin & Julia
          </Link>
          <div className="hidden items-center gap-5 md:flex">
            <nav className="hidden gap-6 text-sm uppercase tracking-[0.2em] text-stoneink/70 md:flex">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-stoneink">
                  {item.label}
                </a>
              ))}
            </nav>
            {languageSwitcher}
          </div>
          <div className="md:hidden">{languageSwitcher}</div>
        </div>
        <nav className="no-scrollbar flex gap-4 overflow-x-auto border-t border-white/25 px-4 pb-3 text-[0.68rem] uppercase tracking-[0.2em] text-stoneink/70 md:hidden">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-stoneink">
                {item.label}
              </a>
            ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
