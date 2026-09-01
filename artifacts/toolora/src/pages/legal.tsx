import { Link, useRoute } from 'wouter';
import { PageShell } from '@/components/toolora-shell';

const privacySections = [
  ['The short version', 'Toolora is designed to be used without an account. We do not ask for your name, email, or payment details to use the tools.'],
  ['Local processing', 'Some tools process files or text directly in your browser. When that is true, the workspace labels it clearly. The content stays in your browser tab and is not uploaded by Toolora.'],
  ['Browser storage', 'Favorites and recently used tools are stored in your browser using local storage. You can clear them from your browser settings at any time.'],
  ['Basic operations', 'Our hosting provider may process standard technical information such as a request IP address and browser type to deliver the site and protect it from abuse.'],
];
const termsSections = [
  ['Use the tools well', 'Toolora is provided for lawful, everyday use. Please do not use it to process material you do not have the right to handle or to interfere with the service.'],
  ['No guarantees', 'We work hard to make each tool useful and accurate, but Toolora is provided as-is. Check important results before relying on them.'],
  ['Your work is yours', 'Toolora does not claim ownership of the text, files, or values you put into a tool. You are responsible for keeping copies of anything important.'],
  ['A living shelf', 'We may improve, change, or retire tools as the collection grows. We will keep the interface clear when a meaningful change affects how a tool works.'],
];

export default function Legal() {
  const [isPrivacy] = useRoute('/privacy');
  const sections = isPrivacy ? privacySections : termsSections;
  const title = isPrivacy ? 'Privacy, plainly.' : 'Terms, without the fog.';
  const intro = isPrivacy ? 'A short explanation of what Toolora does and does not collect.' : 'The few things worth knowing before you use the shelf.';
  return (
    <PageShell>
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24"><div className="max-w-2xl"><span className="font-mono-ui text-[10px] uppercase tracking-[0.16em] text-primary">{isPrivacy ? 'Privacy' : 'Terms'}</span><h1 className="mt-5 font-display text-5xl leading-none tracking-[-0.05em] sm:text-7xl">{title}</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">{intro}</p><p className="mt-4 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Last updated · February 2025</p></div><div className="mt-16 space-y-0 border-t border-border">{sections.map(([heading, copy], index) => <section key={heading} className="grid gap-4 border-b border-border py-8 sm:grid-cols-[180px_1fr] sm:gap-10"><span className="font-mono-ui text-[10px] uppercase tracking-[0.12em] text-primary">0{index + 1}</span><div><h2 className="font-display text-2xl tracking-[-0.03em]">{heading}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p></div></section>)}</div><div className="mt-10 flex gap-5 text-sm font-bold text-primary"><Link href="/about" data-testid="link-legal-about">About Toolora</Link><Link href="/tools" data-testid="link-legal-tools">Browse tools</Link></div></main>
    </PageShell>
  );
}