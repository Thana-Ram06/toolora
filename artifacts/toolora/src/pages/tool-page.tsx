import { ArrowLeft, Bookmark, ChevronRight, Home } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import { getTool, tools } from '@/data/tools';
import { useToolPreferences } from '@/hooks/use-tool-preferences';
import { PageShell } from '@/components/toolora-shell';
import { ToolCard } from '@/components/tool-card';
import { ToolWorkspace } from '@/components/tool-workspace';
import NotFound from '@/pages/not-found';

export default function ToolPage() {
  const params = useParams<{ slug?: string }>();
  const [, setLocation] = useLocation();
  const tool = getTool(params.slug);
  const { favorites, toggleFavorite, rememberTool } = useToolPreferences();
  useEffect(() => {
    if (tool) rememberTool(tool.slug);
  }, [rememberTool, tool]);
  if (!tool) return <NotFound />;
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3);
  return (
    <PageShell>
      <main className="mx-auto max-w-5xl px-5 pb-20 pt-9 sm:px-8 sm:pt-12">
        <div className="mb-7 flex items-center gap-2 overflow-hidden whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground"><Link href="/" data-testid="link-breadcrumb-home" className="inline-flex items-center gap-1.5 hover:text-primary"><Home className="h-3.5 w-3.5" /> Home</Link><ChevronRight className="h-3 w-3" /><Link href="/tools" data-testid="link-breadcrumb-tools" className="hover:text-primary">Tools</Link><ChevronRight className="h-3 w-3" /><span className="truncate text-foreground">{tool.name}</span></div>
        <div className="mb-5 flex items-center justify-between"><button type="button" onClick={() => setLocation('/tools')} data-testid="button-back-tools" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to tools</button><button type="button" onClick={() => toggleFavorite(tool.slug)} data-testid="button-tool-favorite" className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold ${favorites.includes(tool.slug) ? 'border-primary bg-secondary' : 'border-border bg-card hover:bg-muted'}`}><Bookmark className="h-3.5 w-3.5" fill={favorites.includes(tool.slug) ? 'currentColor' : 'none'} /> {favorites.includes(tool.slug) ? 'Saved' : 'Save tool'}</button></div>
        <ToolWorkspace tool={tool} />
        {related.length > 0 && <section className="mt-16"><div className="flex items-end justify-between"><div><span className="font-mono-ui text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Keep exploring</span><h2 className="mt-2 font-display text-3xl tracking-[-0.03em]">More in {tool.category.toLowerCase()}</h2></div><Link href="/tools" data-testid="link-more-tools" className="text-xs font-bold text-primary hover:underline">View library</Link></div><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ToolCard key={item.slug} tool={item} favorite={favorites.includes(item.slug)} onToggleFavorite={toggleFavorite} compact />)}</div></section>}
      </main>
    </PageShell>
  );
}