import { ArrowLeft, SearchX } from 'lucide-react';
import { Link } from 'wouter';
import { PageShell } from '@/components/toolora-shell';

export default function NotFound() {
  return (
    <PageShell>
      <main className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary"><SearchX className="h-7 w-7" /></span>
        <p className="mt-7 font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary">404 · Shelf gap</p>
        <h1 className="mt-4 font-display text-5xl tracking-[-0.05em] sm:text-6xl">That page wandered off.</h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">The link may be old, or the tool you’re after hasn’t found its way onto the shelf yet.</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Link href="/" data-testid="link-not-found-home" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><ArrowLeft className="h-4 w-4" /> Back home</Link><Link href="/tools" data-testid="link-not-found-tools" className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-bold hover:bg-muted">Browse tools</Link></div>
      </main>
    </PageShell>
  );
}
