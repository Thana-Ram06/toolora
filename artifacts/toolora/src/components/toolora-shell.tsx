import { ArrowUpRight, Bookmark, ChevronRight, Layers3, Menu, Search, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

export function TooloraMark() {
  return (
    <span className="flex items-center gap-2.5" data-testid="brand-toolora">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <span className="absolute left-2 top-2 h-2.5 w-2.5 rounded-sm bg-secondary" />
        <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-sm bg-accent" />
        <Layers3 className="relative h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="font-display text-[1.55rem] tracking-[-0.04em]">toolora</span>
    </span>
  );
}

export function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: '/tools', label: 'All tools' },
    { href: '/about', label: 'About' },
  ];
  return (
    <header className="relative z-20 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0" data-testid="link-home">
          <TooloraMark />
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`} className={`text-sm font-semibold transition-colors hover:text-primary ${location === link.href ? 'text-primary' : 'text-muted-foreground'}`}>
              {link.label}
            </Link>
          ))}
          <Link href="/tools#favorites" data-testid="link-favorites" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <Bookmark className="h-4 w-4" /> Saved
          </Link>
          <Link href="/tools" data-testid="link-header-cta" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">
            Browse tools <ArrowUpRight className="h-4 w-4" />
          </Link>
        </nav>
        <button type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu" data-testid="button-toggle-menu" className="rounded-lg p-2 text-foreground hover:bg-muted md:hidden">
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {menuOpen && (
        <nav className="border-t border-border bg-card px-5 py-4 md:hidden" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-between border-b border-border/70 py-3 text-sm font-bold">
              {link.label}<ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
          <Link href="/tools#favorites" onClick={() => setMenuOpen(false)} data-testid="link-mobile-favorites" className="flex items-center justify-between py-3 text-sm font-bold">
            Saved tools <Bookmark className="h-4 w-4 text-primary" />
          </Link>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const footerCategories = [
    { href: '/tools/image', label: 'Image tools' },
    { href: '/tools/text', label: 'Text tools' },
    { href: '/tools/developer', label: 'Developer tools' },
    { href: '/tools/generators', label: 'Generators' },
  ];
  return (
    <footer className="border-t border-border/70 bg-card/70">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.3fr_1fr_0.7fr]">
        <div>
          <TooloraMark />
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">Simple tools for the small things that keep life moving.</p>
        </div>
        <div>
          <p className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Explore</p>
          <div className="mt-3 grid gap-2 text-sm font-semibold text-muted-foreground sm:grid-cols-2">
            {footerCategories.map((category) => <Link key={category.href} href={category.href} className="hover:text-primary">{category.label}</Link>)}
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm font-semibold text-muted-foreground md:items-end">
          <Link href="/about" data-testid="link-footer-about" className="hover:text-primary">About</Link>
          <Link href="/privacy" data-testid="link-footer-privacy" className="hover:text-primary">Privacy</Link>
          <Link href="/terms" data-testid="link-footer-terms" className="hover:text-primary">Terms</Link>
          <a href="mailto:hello@toolora.tools" data-testid="link-footer-email" className="hover:text-primary">Say hello</a>
          <a href="https://x.com/anoinv" target="_blank" rel="noreferrer" data-testid="link-footer-x" className="hover:text-primary">X / @anoinv</a>
          <p className="mt-4 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Made for the everyday</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`min-h-[100dvh] bg-background text-foreground ${className}`}><Header />{children}<Footer /></div>;
}

export function SearchJump() {
  const [, setLocation] = useLocation();
  return (
    <form onSubmit={(event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get('search'); setLocation(`/tools${value ? `?q=${encodeURIComponent(String(value))}` : ''}`); }} className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />
      <input name="search" aria-label="Search tools" data-testid="input-search-tools" className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm outline-none transition-shadow placeholder:text-muted-foreground/80 focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Search tools by name or task..." />
    </form>
  );
}