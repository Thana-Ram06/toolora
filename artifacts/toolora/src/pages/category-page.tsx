import { ArrowLeft, ChevronRight, Home, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'wouter';
import { categories, tools, type ToolCategory } from '@/data/tools';
import { PageShell } from '@/components/toolora-shell';
import { ToolCard } from '@/components/tool-card';
import { useToolPreferences } from '@/hooks/use-tool-preferences';
import NotFound from '@/pages/not-found';

const routeToCategory: Record<string, ToolCategory> = {
  popular: 'Popular',
  text: 'Text',
  files: 'Files',
  image: 'Files',
  pdf: 'Files',
  developer: 'Developer',
  security: 'Generators',
  color: 'Design',
  calculator: 'Generators',
  'date-time': 'Developer',
  web: 'Generators',
};

export default function CategoryPage() {
  const { category: route } = useParams<{ category?: string }>();
  const category = route ? routeToCategory[route.toLowerCase()] : undefined;
  const [query, setQuery] = useState('');
  const { favorites, toggleFavorite } = useToolPreferences();
  const results = useMemo(() => tools.filter((tool) => {
    const matchesCategory = category === 'Popular' ? tool.featured : tool.category === category;
    return matchesCategory && `${tool.name} ${tool.description} ${tool.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
  }), [category, query]);
  const details = category ? categories.find((item) => item.name === category) : undefined;

  if (!category || !details) return <NotFound />;
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 pb-20 pt-9 sm:px-8 sm:pt-12">
        <div className="mb-8 flex items-center gap-2 overflow-hidden whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-primary"><Home className="h-3.5 w-3.5" /> Home</Link>
          <ChevronRight className="h-3 w-3" /><Link href="/tools" className="hover:text-primary">Tools</Link>
          <ChevronRight className="h-3 w-3" /><span className="text-foreground">{details.name}</span>
        </div>
        <div className="flex flex-col justify-between gap-7 border-b border-border pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><Link href="/tools" className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All tools</Link><p className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary">Browse by category</p><h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.05em] sm:text-7xl">{details.name} tools</h1><p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">{details.description}. Pick a focused tool and get back to what you were doing.</p></div>
          <div className="relative w-full lg:max-w-sm"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label={`Search ${details.name} tools`} className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder={`Search ${details.name.toLowerCase()} tools...`} /></div>
        </div>
        <div className="mt-8 flex items-center justify-between"><p className="text-sm font-bold">{results.length} {results.length === 1 ? 'tool' : 'tools'} in this corner</p><Link href="/tools" className="text-xs font-bold text-primary hover:underline">See all tools</Link></div>
        {results.length > 0 ? <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map((tool, index) => <div key={tool.slug} className={`animate-rise delay-${Math.min(index + 1, 5)}`}><ToolCard tool={tool} favorite={favorites.includes(tool.slug)} onToggleFavorite={toggleFavorite} /></div>)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center"><p className="font-display text-3xl">No matches here yet.</p><p className="mt-2 text-sm text-muted-foreground">Try a shorter search or browse the full library.</p></div>}
      </main>
    </PageShell>
  );
}