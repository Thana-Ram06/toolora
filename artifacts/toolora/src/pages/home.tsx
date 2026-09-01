import { ArrowRight, Check, Clock3, Code2, Command, Files, Heart, MousePointer2, Palette, ShieldCheck, Sparkles, Type, WandSparkles } from 'lucide-react';
import { Link } from 'wouter';
import { categories, tools } from '@/data/tools';
import { useToolPreferences } from '@/hooks/use-tool-preferences';
import { PageShell, SearchJump } from '@/components/toolora-shell';
import { ToolCard } from '@/components/tool-card';

const featured = tools.filter((tool) => tool.featured);

export default function Home() {
  const { favorites, toggleFavorite, recentSlugs } = useToolPreferences();
  const recent = recentSlugs.map((slug) => tools.find((tool) => tool.slug === slug)).filter(Boolean).slice(0, 3);
  return (
    <PageShell>
      <main>
        <section className="relative overflow-hidden border-b border-border/70">
          <div className="pointer-events-none absolute -right-28 -top-40 h-[32rem] w-[32rem] rounded-full bg-secondary/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:gap-20 lg:pb-28">
            <div className="relative">
              <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 font-mono-ui text-[10px] uppercase tracking-[0.13em] text-muted-foreground shelf-shadow"><span className="h-2 w-2 rounded-full bg-accent" /> A useful corner of the internet</div>
               <h1 className="animate-rise delay-1 mt-7 max-w-[10ch] font-display text-[4.5rem] leading-[0.88] tracking-[-0.065em] sm:text-[6.6rem]">Simple tools.<br /><span className="text-primary">Zero hassle.</span></h1>
              <p className="animate-rise delay-2 mt-7 max-w-lg text-[1.05rem] leading-8 text-muted-foreground">Free online tools for everyday things — compress, convert, calculate, generate, format, and more.</p>
              <div className="animate-rise delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/tools" data-testid="link-hero-browse" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1">Browse all tools <ArrowRight className="h-4 w-4" /></Link>
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">No accounts. No catch.</span>
              </div>
            </div>
            <div className="animate-rise delay-2 relative mx-auto w-full max-w-[470px]">
              <div className="absolute -left-7 top-8 hidden h-28 w-7 rounded-l-xl bg-primary/80 sm:block" />
              <div className="absolute -right-7 bottom-14 hidden h-28 w-7 rounded-r-xl bg-accent sm:block" />
              <div className="relative rotate-[1.5deg] rounded-[1.75rem] border border-border bg-card p-4 shelf-shadow-lg">
                <div className="flex items-center justify-between border-b border-border px-2 pb-4"><span className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">The utility shelf</span><span className="flex items-center gap-1.5 text-xs font-bold"><span className="h-2 w-2 rounded-full bg-primary" /> Ready when you are</span></div>
                <div className="grid grid-cols-2 gap-3 p-1 pt-4">
                  {featured.map((tool, index) => (
                    <Link href={`/tools/${tool.slug}`} key={tool.slug} data-testid={`link-shelf-tool-${tool.slug}`} className={`group min-h-[128px] rounded-2xl p-4 transition-transform hover:-translate-y-1 ${index === 0 ? 'bg-secondary' : index === 1 ? 'bg-[hsl(7_74%_68%_/_0.25)]' : index === 2 ? 'bg-[hsl(37_80%_74%_/_0.42)]' : 'bg-muted'}`}>
                      <span className="font-mono-ui text-[9px] uppercase tracking-[0.12em] text-muted-foreground">0{index + 1} / {tool.category}</span>
                      <p className="mt-5 max-w-[11ch] text-sm font-extrabold leading-5">{tool.name}</p>
                      <ArrowRight className="mt-3 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
                <div className="mx-1 mt-3 flex items-center gap-2 rounded-xl bg-foreground px-4 py-3 text-background"><Command className="h-4 w-4 text-secondary" /><span className="font-mono-ui text-[10px] tracking-[0.08em]">A calmer way to get unstuck</span></div>
              </div>
               <p className="mt-5 text-center font-mono-ui text-[10px] uppercase tracking-[0.13em] text-muted-foreground">{tools.length} thoughtful tools, and growing</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary">Start here</span>
            <h2 className="mt-3 font-display text-4xl tracking-[-0.04em] sm:text-5xl">What are you working on?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Skip the hunt. Tell us what you need and we’ll put the right shelf in reach.</p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl"><SearchJump /></div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {featured.map((tool, index) => <ToolCard key={tool.slug} tool={tool} favorite={favorites.includes(tool.slug)} onToggleFavorite={toggleFavorite} />)}
          </div>
        </section>

         <section className="border-t border-border/70 bg-card/50">
           <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
             <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary">Find your corner</span><h2 className="mt-3 font-display text-4xl tracking-[-0.04em] sm:text-5xl">Explore all tools</h2></div><Link href="/tools" className="text-sm font-bold text-primary hover:underline">See the full library <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div>
             <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.filter((category) => category.name !== 'Popular').map((category) => {
               const iconMap = { Popular: Sparkles, Text: Type, Files, Developer: Code2, Design: Palette, Generators: WandSparkles };
               const Icon = iconMap[category.name];
               const href = category.name === 'Files' ? '/tools/image' : `/tools/${category.name.toLowerCase()}`;
               const count = tools.filter((tool) => tool.category === category.name).length;
               return <Link key={category.name} href={href} className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_14px_32px_hsl(221_29%_17%_/_0.07)]"><div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground"><Icon className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" /></div><h3 className="mt-6 text-base font-extrabold">{category.name} tools</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}.</p><p className="mt-4 font-mono-ui text-[10px] uppercase tracking-[0.12em] text-primary">{count} tools</p></Link>;
             })}</div>
           </div>
         </section>

        <section className="border-y border-border/70 bg-[hsl(173_30%_30%)] text-[hsl(40_43%_98%)]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-20">
            <div><span className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-secondary">The Toolora rule</span><h2 className="mt-4 max-w-md font-display text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Useful first.<br />Clever never.</h2><p className="mt-5 max-w-md text-sm leading-7 text-[hsl(40_43%_98%_/_0.72)]">Every tool earns its place by doing one small thing well. No labyrinths, no logins, no mystery buttons.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{ icon: ShieldCheck, title: 'Private by default', copy: 'Local tools stay on your device.' }, { icon: MousePointer2, title: 'One clear action', copy: 'Open it and know what to do.' }, { icon: Heart, title: 'Free for real', copy: 'No trial clock hiding in the corner.' }].map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-2xl border border-[hsl(40_43%_98%_/_0.18)] bg-[hsl(40_43%_98%_/_0.07)] p-5"><Icon className="h-5 w-5 text-secondary" /><h3 className="mt-8 text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-[hsl(40_43%_98%_/_0.62)]">{copy}</p></div>)}
            </div>
          </div>
        </section>

        {recent.length > 0 && <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="flex items-end justify-between"><div><span className="font-mono-ui text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Welcome back</span><h2 className="mt-3 font-display text-4xl tracking-[-0.04em]">Picked up lately</h2></div><Clock3 className="h-5 w-5 text-muted-foreground" /></div><div className="mt-8 grid gap-4 md:grid-cols-3">{recent.map((tool) => tool && <ToolCard key={tool.slug} tool={tool} favorite={favorites.includes(tool.slug)} onToggleFavorite={toggleFavorite} compact />)}</div></section>}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"><div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[hsl(37_80%_74%_/_0.55)] px-6 py-8 sm:flex-row sm:items-center sm:px-10"><div><p className="font-display text-2xl tracking-[-0.03em]">Keep a good shortcut close.</p><p className="mt-1 text-sm text-foreground/70">Save your favorites — they stay right in this browser.</p></div><Link href="/tools#favorites" data-testid="link-home-favorites" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background">See saved tools <Check className="h-4 w-4" /></Link></div></section>
      </main>
    </PageShell>
  );
}