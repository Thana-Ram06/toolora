import { AlignLeft, ArrowDownUp, ArrowLeftRight, ArrowUpRight, BadgeCheck, Bookmark, Braces, CaseUpper, Code2, Crop, FileImage, FileOutput, Fingerprint, Hash, ImageDown, KeyRound, Layers3, ListX, Maximize2, Pipette, ScanLine, Sparkles, TextCursorInput, WandSparkles, WrapText, type LucideIcon } from 'lucide-react';
import { Link } from 'wouter';
import type { Tool } from '@/data/tools';

const icons: Record<string, LucideIcon> = { AlignLeft, ArrowDownUp, ArrowLeftRight, BadgeCheck, Braces, CaseUpper, Code2, Crop, FileImage, FileOutput, Fingerprint, Hash, ImageDown, KeyRound, Layers3, ListX, Maximize2, Pipette, ScanLine, Sparkles, TextCursorInput, WandSparkles, WrapText };
const accentClasses = {
  teal: 'bg-[hsl(173_30%_30%)] text-[hsl(40_43%_98%)]',
  coral: 'bg-[hsl(7_74%_68%)] text-[hsl(221_29%_17%)]',
  gold: 'bg-[hsl(37_80%_74%)] text-[hsl(221_29%_17%)]',
  ink: 'bg-[hsl(221_29%_17%)] text-[hsl(40_43%_98%)]',
};

export function ToolCard({ tool, favorite, onToggleFavorite, compact = false }: { tool: Tool; favorite?: boolean; onToggleFavorite?: (slug: string) => void; compact?: boolean }) {
  const Icon = icons[tool.icon] ?? Sparkles;
  return (
    <div className={`group relative flex flex-col rounded-[1.25rem] border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_35px_hsl(221_29%_17%_/_0.09)] ${compact ? 'min-h-[174px]' : 'min-h-[210px]'}`} data-testid={`card-tool-${tool.slug}`}>
      <div className="flex items-start justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${accentClasses[tool.accent]}`}><Icon className="h-5 w-5" strokeWidth={1.8} /></span>
        {onToggleFavorite && (
          <button type="button" onClick={() => onToggleFavorite(tool.slug)} aria-label={`${favorite ? 'Remove' : 'Save'} ${tool.name}`} data-testid={`button-favorite-${tool.slug}`} className={`rounded-full p-2 transition-colors ${favorite ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
            <Bookmark className="h-4 w-4" fill={favorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
      <Link href={`/tools/${tool.slug}`} data-testid={`link-tool-${tool.slug}`} className="mt-5 block flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-[1.05rem] font-extrabold tracking-[-0.025em]">{tool.name}</h3>
          <ArrowUpRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
        <p className="mt-2 max-w-[28ch] text-sm leading-6 text-muted-foreground">{tool.description}</p>
      </Link>
      <div className="mt-4 flex items-center gap-2">
        <span className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{tool.category}</span>
        {tool.local && <span className="rounded-full bg-secondary/70 px-2 py-1 font-mono-ui text-[9px] uppercase tracking-[0.08em] text-foreground">On device</span>}
      </div>
    </div>
  );
}