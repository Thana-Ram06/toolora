import { Bookmark, Check, Filter, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { categories, tools, type ToolCategory } from '@/data/tools';
import { useToolPreferences } from '@/hooks/use-tool-preferences';
import { PageShell } from '@/components/toolora-shell';
import { ToolCard } from '@/components/tool-card';

export default function Tools() {
  const [location] = useLocation();
  const initialQuery = new URLSearchParams(location.split('?')[1] ?? '').get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<ToolCategory | 'All'>('All');
  const [showFavorites, setShowFavorites] = useState(location.includes('#favorites'));
  const { favorites, toggleFavorite } = useToolPreferences();
  useEffect(() => { setShowFavorites(location.includes('#favorites')); }, [location]);
  const results = useMemo(() => tools.filter((tool) => {
    const matchesQuery = `${tool.name} ${tool.description} ${tool.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || tool.category === category || (category === 'Popular' && tool.featured);
    const matchesFavorite = !showFavorites || favorites.includes(tool.slug);
    return matchesQuery && matchesCategory && matchesFavorite;
  }), [category, favorites, query, showFavorites]);
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <div className="max-w-2xl animate-rise"><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary">The library</span><h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl">Find your<br /><span className="text-primary">next shortcut.</span></h1><p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">A growing shelf of browser-first tools for the things between the big things.</p></div>
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-library-search" className="h-13 w-full rounded-xl border border-border bg-card pl-11 pr-10 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder="Search by task, format, or tool..." />{query && <button type="button" onClick={() => setQuery('')} data-testid="button-clear-search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}</div>
          <button type="button" onClick={() => setShowFavorites((value) => !value)} data-testid="button-filter-favorites" className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition-colors ${showFavorites ? 'border-primary bg-secondary text-foreground' : 'border-border bg-card hover:bg-muted'}`}><Bookmark className="h-4 w-4" fill={showFavorites ? 'currentColor' : 'none'} /> Saved <span className="font-mono-ui text-[10px]">({favorites.length})</span></button>
        </div>
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2"><SlidersHorizontal className="mr-1 h-4 w-4 shrink-0 text-muted-foreground" /><button type="button" onClick={() => setCategory('All')} data-testid="button-category-all" className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${category === 'All' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>All tools</button>{categories.map((item) => <button type="button" key={item.name} onClick={() => setCategory(item.name)} data-testid={`button-category-${item.name.toLowerCase()}`} className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold ${category === item.name ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>{item.name}</button>)}</div>
        <div className="mt-10 flex items-center justify-between border-b border-border pb-4"><div className="flex items-center gap-2"><Filter className="h-4 w-4 text-primary" /><p className="text-sm font-bold" data-testid="text-results-count">{results.length} {results.length === 1 ? 'tool' : 'tools'}</p></div>{(query || category !== 'All' || showFavorites) && <button type="button" onClick={() => { setQuery(''); setCategory('All'); setShowFavorites(false); }} data-testid="button-reset-filters" className="text-xs font-bold text-muted-foreground hover:text-foreground">Reset filters</button>}</div>
        {results.length > 0 ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((tool, index) => <div key={tool.slug} className={`animate-rise delay-${Math.min(index + 1, 5)}`}><ToolCard tool={tool} favorite={favorites.includes(tool.slug)} onToggleFavorite={toggleFavorite} /></div>)}</div> : <div className="mt-8 flex min-h-[310px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 text-center"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary"><Sparkles className="h-6 w-6" /></span><h2 className="mt-5 font-display text-3xl tracking-[-0.03em]">{showFavorites ? 'Nothing saved here yet' : 'No tools found'}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{showFavorites ? 'Tap the bookmark on any tool to keep it close.' : 'Try a different phrase, or browse the full shelf.'}</p><button type="button" onClick={() => { setQuery(''); setCategory('All'); setShowFavorites(false); }} data-testid="button-empty-reset" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"><Check className="h-4 w-4" /> Show all tools</button></div>}
      </main>
    </PageShell>
  );
}