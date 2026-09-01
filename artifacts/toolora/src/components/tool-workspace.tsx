import {
  Check,
  Clipboard,
  Download,
  FileImage,
  FileOutput,
  FileUp,
  Images,
  LockKeyhole,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import QRCode from 'qrcode';
import type { Tool } from '@/data/tools';
import {
  canvasToBlob,
  createImagePdf,
  downloadBlob,
  drawImageToCanvas,
  formatBytes,
  loadImage,
} from '@/lib/client-tools';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      }}
      disabled={!value}
      data-testid="button-copy-output"
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-bold transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Clipboard className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function WorkspaceHeader({ tool }: { tool: Tool }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-2 font-mono-ui text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>Toolora</span><span>/</span><span>{tool.category}</span>
        </div>
        <h1 className="font-display text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl">{tool.name}</h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{tool.description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2 rounded-full border border-secondary/70 bg-secondary/30 px-3 py-2 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-foreground">
        <LockKeyhole className="h-3.5 w-3.5" /> {tool.local ? 'Runs in your browser' : 'No sign-in needed'}
      </div>
    </div>
  );
}

function TextTool({ tool }: { tool: Tool }) {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [caseMode, setCaseMode] = useState('title');
  const [paragraphs, setParagraphs] = useState(2);
  const [decode, setDecode] = useState(tool.slug === 'base64-decoder');

  const counts = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      words,
      characters: text.length,
      withoutSpaces: text.replace(/\s/g, '').length,
      sentences: text.trim() ? (text.match(/[.!?]+(?=\s|$)/g) ?? []).length : 0,
      paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0,
      reading: Math.max(0, Math.ceil(words / 200)),
    };
  }, [text]);

  function runAction() {
    if (tool.slug === 'json-formatter' || tool.slug === 'json-validator') {
      try {
        const parsed = JSON.parse(text);
        setOutput(tool.slug === 'json-validator' ? 'Valid JSON. The structure is ready to use.' : JSON.stringify(parsed, null, 2));
      } catch {
        setOutput(tool.slug === 'json-validator' ? 'Invalid JSON. Check commas, quotes, and brackets.' : 'This does not look like valid JSON yet.');
      }
      return;
    }
    if (tool.slug === 'text-case-converter') {
      const result = caseMode === 'upper'
        ? text.toUpperCase()
        : caseMode === 'lower'
          ? text.toLowerCase()
          : caseMode === 'sentence'
            ? text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase())
            : text.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
      setOutput(result);
      return;
    }
    if (tool.slug === 'base64-encoder' || tool.slug === 'base64-decoder') {
      try {
        setOutput(decode ? decodeURIComponent(escape(atob(text))) : btoa(unescape(encodeURIComponent(text))));
      } catch {
        setOutput('Unable to decode this value. Make sure the input is valid Base64.');
      }
      return;
    }
    if (tool.slug === 'remove-duplicate-lines') {
      setOutput([...new Set(text.split(/\r?\n/))].join('\n'));
      return;
    }
    if (tool.slug === 'remove-extra-spaces') {
      setOutput(text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim());
      return;
    }
    if (tool.slug === 'reverse-text') {
      setOutput([...text].reverse().join(''));
      return;
    }
    if (tool.slug === 'lorem-ipsum-generator') {
      const copy = 'A small useful thing, made clear. A thoughtful starting point for layouts, prototypes, and ideas that are still finding their shape.';
      setOutput(Array.from({ length: paragraphs }, () => copy).join('\n\n'));
      return;
    }
    setOutput(text);
  }

  if (tool.slug === 'word-counter' || tool.slug === 'character-counter') {
    return (
      <div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          data-testid="input-word-counter"
          className="min-h-[270px] w-full resize-y rounded-xl border border-input bg-background p-5 text-[15px] leading-7 outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10"
          placeholder="Paste or start typing here..."
        />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(counts).map(([label, value]) => (
            <div key={label} className="rounded-xl bg-muted/70 px-3 py-3">
              <p className="font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{label === 'reading' ? 'Minutes' : label}</p>
              <p className="mt-1 text-xl font-extrabold" data-testid={`value-word-counter-${label}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="tool-input" className="font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Input</label>
          <button type="button" onClick={() => { setText(''); setOutput(''); }} data-testid="button-clear-input" className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Clear</button>
        </div>
        <textarea id="tool-input" value={text} onChange={(event) => setText(event.target.value)} data-testid="input-tool-workspace" className="min-h-[250px] w-full resize-y rounded-xl border border-input bg-background p-4 font-mono-ui text-sm leading-6 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" placeholder={tool.slug.includes('json') ? '{"hello":"Toolora"}' : 'Type or paste something here...'} />
        {tool.slug === 'text-case-converter' && <select value={caseMode} onChange={(event) => setCaseMode(event.target.value)} data-testid="select-text-case" className="mt-3 h-10 rounded-lg border border-input bg-background px-3 text-sm font-semibold outline-none focus:border-primary"><option value="title">Title Case</option><option value="sentence">Sentence case</option><option value="upper">UPPER CASE</option><option value="lower">lower case</option></select>}
        {tool.slug === 'lorem-ipsum-generator' && <div className="mt-3 flex items-center gap-3"><label htmlFor="paragraph-count" className="text-sm font-semibold">Paragraphs</label><input id="paragraph-count" type="number" min="1" max="8" value={paragraphs} onChange={(event) => setParagraphs(Math.min(8, Math.max(1, Number(event.target.value))))} className="h-10 w-20 rounded-lg border border-input bg-background px-3 text-sm" /></div>}
        {tool.slug.includes('base64') && <button type="button" onClick={() => setDecode((current) => !current)} className="mt-3 rounded-lg border border-border px-3 py-2 text-xs font-bold">{decode ? 'Decode Base64' : 'Encode text'}</button>}
        <button type="button" onClick={runAction} data-testid="button-run-tool" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"><WandSparkles className="h-4 w-4" /> {tool.slug.includes('json') ? 'Validate & format' : 'Convert'}</button>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between"><span className="font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Result</span><CopyButton value={output} /></div>
        <pre data-testid="text-tool-output" className="min-h-[250px] overflow-auto whitespace-pre-wrap rounded-xl border border-border bg-muted/50 p-4 font-mono-ui text-sm leading-6 text-foreground">{output || 'Your result will appear here.'}</pre>
      </div>
    </div>
  );
}

function ImageWorkspace({ tool }: { tool: Tool }) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState('');
  const [output, setOutput] = useState<{ blob: Blob; name: string; original: number; width: number; height: number } | null>(null);
  const [quality, setQuality] = useState(0.72);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [locked, setLocked] = useState(true);
  const [format, setFormat] = useState('image/webp');
  const [status, setStatus] = useState('');
  const isPdf = tool.slug === 'image-to-pdf';

  async function selectFiles(nextFiles: File[]) {
    const images = nextFiles.filter((file) => file.type.startsWith('image/'));
    if (!images.length) {
      setStatus('This file could not be processed. Please choose a JPG, PNG, or WebP image.');
      return;
    }
    setFiles(isPdf ? images : [images[0]]);
    setStatus('');
    const first = await loadImage(images[0]);
    setWidth(first.naturalWidth);
    setHeight(first.naturalHeight);
    setPreview(URL.createObjectURL(images[0]));
  }

  async function processImage() {
    if (!files[0]) return;
    try {
      const image = await loadImage(files[0]);
      const cropSize = Math.min(image.naturalWidth, image.naturalHeight);
      const nextWidth = tool.slug === 'image-resizer' ? width : tool.slug === 'image-cropper' ? cropSize : image.naturalWidth;
      const nextHeight = tool.slug === 'image-resizer' ? height : tool.slug === 'image-cropper' ? cropSize : image.naturalHeight;
      const canvas = drawImageToCanvas(image, nextWidth, nextHeight, tool.slug === 'image-cropper');
      const mime = tool.slug === 'image-converter' ? format : tool.slug === 'image-compressor' ? 'image/jpeg' : 'image/png';
      const blob = await canvasToBlob(canvas, mime, tool.slug === 'image-compressor' ? quality : 0.92);
      const extension = mime.split('/')[1].replace('jpeg', 'jpg');
      setOutput({ blob, name: `${files[0].name.replace(/\.[^.]+$/, '')}.${extension}`, original: files[0].size, width: canvas.width, height: canvas.height });
      setPreview(URL.createObjectURL(blob));
      setStatus('Ready to download.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'This file could not be processed. Please try another file.');
    }
  }

  async function makePdf() {
    if (!files.length) return;
    try {
      const images = await Promise.all(files.map(async (file) => {
        const image = await loadImage(file);
        const canvas = drawImageToCanvas(image, image.naturalWidth, image.naturalHeight);
        const blob = await canvasToBlob(canvas, 'image/jpeg', 0.9);
        return { bytes: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height };
      }));
      const pdf = createImagePdf(images);
      downloadBlob(pdf, 'toolora-images.pdf');
      setStatus(`${files.length} ${files.length === 1 ? 'image' : 'images'} exported to PDF.`);
    } catch {
      setStatus('This file could not be processed. Please try another file.');
    }
  }

  if (isPdf) {
    return (
      <div>
        <FileDropzone files={files} onFiles={selectFiles} multiple status={status} />
        {files.length > 0 && <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/60 p-4"><span className="text-sm font-semibold">{files.length} image{files.length === 1 ? '' : 's'} ready</span><button type="button" onClick={makePdf} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"><FileOutput className="h-4 w-4" /> Download PDF</button></div>}
      </div>
    );
  }

  return (
    <div>
      <FileDropzone files={files} onFiles={selectFiles} status={status} />
      {files[0] && <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"><div className="overflow-hidden rounded-xl border border-border bg-muted/50 p-3"><img src={preview} alt="Selected preview" className="max-h-[260px] w-full object-contain" /></div><div>
        {tool.slug === 'image-compressor' && <div><div className="flex justify-between text-sm font-bold"><label htmlFor="image-quality">Quality</label><span className="font-mono-ui text-primary">{Math.round(quality * 100)}%</span></div><input id="image-quality" type="range" min="0.2" max="1" step="0.02" value={quality} onChange={(event) => setQuality(Number(event.target.value))} className="mt-3 w-full accent-[hsl(173_30%_30%)]" /></div>}
        {tool.slug === 'image-resizer' && <DimensionInputs width={width} height={height} locked={locked} onWidth={(value) => { setWidth(value); if (locked && files[0]) setHeight(Math.round(value * height / width)); }} onHeight={(value) => { setHeight(value); if (locked && files[0]) setWidth(Math.round(value * width / height)); }} onLock={() => setLocked((value) => !value)} />}
        {tool.slug === 'image-converter' && <label className="block text-sm font-bold">Output format<select value={format} onChange={(event) => setFormat(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"><option value="image/webp">WebP</option><option value="image/jpeg">JPG</option><option value="image/png">PNG</option></select></label>}
        {tool.slug === 'image-cropper' && <p className="text-sm leading-6 text-muted-foreground">Crop to a centered square while keeping the best part of the image.</p>}
        <button type="button" onClick={processImage} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"><Sparkles className="h-4 w-4" /> {tool.slug === 'image-compressor' ? 'Compress image' : 'Process image'}</button>
        {output && <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-secondary bg-secondary/25 p-4"><div className="text-sm"><p className="font-bold">{formatBytes(output.blob.size)} output</p><p className="text-xs text-muted-foreground">{output.width} × {output.height} px · {Math.max(0, Math.round((1 - output.blob.size / output.original) * 100))}% smaller</p></div><button type="button" onClick={() => downloadBlob(output.blob, output.name)} className="ml-auto inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-xs font-bold text-background"><Download className="h-3.5 w-3.5" /> Download</button></div>}
      </div></div>}
    </div>
  );
}

function DimensionInputs({ width, height, locked, onWidth, onHeight, onLock }: { width: number; height: number; locked: boolean; onWidth: (value: number) => void; onHeight: (value: number) => void; onLock: () => void }) {
  return <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2"><label className="text-sm font-bold">Width<input type="number" min="1" value={width} onChange={(event) => onWidth(Math.max(1, Number(event.target.value)))} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" /></label><button type="button" onClick={onLock} aria-label="Toggle aspect ratio lock" className={`mb-1 rounded-lg border p-3 ${locked ? 'border-primary bg-secondary' : 'border-border'}`}><LockKeyhole className="h-4 w-4" /></button><label className="text-sm font-bold">Height<input type="number" min="1" value={height} onChange={(event) => onHeight(Math.max(1, Number(event.target.value)))} className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm" /></label></div>;
}

function FileDropzone({ files, onFiles, multiple = false, status }: { files: File[]; onFiles: (files: File[]) => void; multiple?: boolean; status: string }) {
  return <div><label htmlFor="file-upload" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void onFiles(Array.from(event.dataTransfer.files)); }} className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 px-5 text-center transition-colors hover:border-primary hover:bg-secondary/20"><span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-foreground">{multiple ? <Images className="h-6 w-6" /> : <FileImage className="h-6 w-6" />}</span><span className="font-bold">{files.length ? `${files.length} file${files.length === 1 ? '' : 's'} selected` : 'Drop your files here'}</span><span className="mt-2 text-sm text-muted-foreground">or choose {multiple ? 'files' : 'a file'} · nothing leaves your device</span><input id="file-upload" type="file" accept="image/jpeg,image/png,image/webp" multiple={multiple} onChange={(event) => { void onFiles(Array.from(event.target.files ?? [])); }} data-testid="input-file-upload" className="sr-only" /></label>{status && <p className={`mt-3 text-sm ${status.startsWith('This') ? 'text-destructive' : 'text-primary'}`}>{status}</p>}<div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole className="h-3.5 w-3.5 text-primary" /> Your files are processed locally in your browser and aren't uploaded.</div></div>;
}

function PasswordTool() {
  const [output, setOutput] = useState('');
  const [length, setLength] = useState(18);
  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  function generatePassword() {
    const alphabet = `${uppercase ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : ''}abcdefghijkmnopqrstuvwxyz${numbers ? '23456789' : ''}${symbols ? '!@#$%^&*_-+=' : ''}`;
    if (!alphabet) return;
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    setOutput(Array.from(values, (value) => alphabet[value % alphabet.length]).join(''));
  }
  const options: { label: string; checked: boolean; setChecked: (value: boolean) => void }[] = [
    { label: 'Uppercase', checked: uppercase, setChecked: setUppercase },
    { label: 'Numbers', checked: numbers, setChecked: setNumbers },
    { label: 'Symbols', checked: symbols, setChecked: setSymbols },
  ];
  return <div className="max-w-2xl"><div className="rounded-xl bg-muted/70 p-5 sm:p-6"><p className="mb-2 font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Your password</p><div className="flex gap-2"><input readOnly value={output} placeholder="Click generate to make one" data-testid="output-password" className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 font-mono-ui text-sm outline-none" /><CopyButton value={output} /></div></div><div className="mt-6"><div className="flex justify-between text-sm font-bold"><label htmlFor="password-length">Length</label><span className="font-mono-ui text-primary">{length}</span></div><input id="password-length" type="range" min="8" max="40" value={length} onChange={(event) => setLength(Number(event.target.value))} data-testid="input-password-length" className="mt-3 w-full accent-[hsl(173_30%_30%)]" /></div><div className="mt-5 flex flex-wrap gap-3">{options.map(({ label, checked, setChecked }) => <label key={label} className="flex cursor-pointer items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} className="h-4 w-4 accent-[hsl(173_30%_30%)]" />{label}</label>)}</div><button type="button" onClick={generatePassword} data-testid="button-generate-password" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:-translate-y-0.5"><RefreshCw className="h-4 w-4" /> Generate password</button></div>;
}

function UtilityTool({ tool }: { tool: Tool }) {
  const [value, setValue] = useState('');
  const [output, setOutput] = useState('');
  const [color, setColor] = useState('#2F6861');
  const [qrCode, setQrCode] = useState('');
  const [qrSize, setQrSize] = useState(256);
  if (tool.slug === 'uuid-generator') return <div className="max-w-2xl"><div className="rounded-xl border border-border bg-muted/50 p-5 font-mono-ui text-sm break-all" data-testid="output-uuid">{output || 'Click the button for a fresh UUID.'}</div><button type="button" onClick={() => setOutput(crypto.randomUUID())} data-testid="button-generate-uuid" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:-translate-y-0.5"><RefreshCw className="h-4 w-4" /> Generate UUID</button></div>;
  if (tool.slug === 'color-picker') return <div className="flex max-w-xl flex-col gap-5 sm:flex-row sm:items-end"><div><label htmlFor="color-picker" className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Pick a color</label><input id="color-picker" type="color" value={color} onChange={(event) => setColor(event.target.value)} data-testid="input-color-picker" className="h-28 w-28 cursor-pointer rounded-xl border-0 bg-transparent p-0" /></div><div className="flex-1"><label htmlFor="color-value" className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Hex value</label><div className="flex gap-2"><input id="color-value" value={color} onChange={(event) => setColor(event.target.value)} data-testid="input-color-value" className="h-11 flex-1 rounded-lg border border-input bg-background px-3 font-mono-ui text-sm uppercase outline-none focus:border-primary" /><CopyButton value={color} /></div></div></div>;
  if (tool.slug === 'qr-code-generator') return <div className="grid gap-5 md:grid-cols-[1fr_220px]"><div><label htmlFor="qr-input" className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Text or URL</label><textarea id="qr-input" value={value} onChange={(event) => setValue(event.target.value)} data-testid="input-qr-text" className="min-h-28 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:border-primary" placeholder="https://toolora.tools" /><div className="mt-4 flex items-center gap-3"><label htmlFor="qr-size" className="text-sm font-semibold">Size</label><select id="qr-size" value={qrSize} onChange={(event) => setQrSize(Number(event.target.value))} className="h-10 rounded-lg border border-input bg-background px-3 text-sm"><option value="192">192 px</option><option value="256">256 px</option><option value="512">512 px</option></select><button type="button" onClick={async () => { if (!value.trim()) return; setQrCode(await QRCode.toDataURL(value.trim(), { width: qrSize, margin: 2, errorCorrectionLevel: 'M' })); }} data-testid="button-create-qr" className="ml-auto inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"><WandSparkles className="h-4 w-4" /> Create code</button></div></div><div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-xl bg-muted p-4">{qrCode ? <><img src={qrCode} alt="Generated QR code" width={qrSize} height={qrSize} className="max-h-44 max-w-full rounded bg-white p-2" /><button type="button" onClick={() => { const binary = atob(qrCode.split(',')[1]); const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0)); downloadBlob(new Blob([bytes], { type: 'image/png' }), 'toolora-qr-code.png'); }} className="inline-flex items-center gap-2 rounded-lg bg-foreground px-3 py-2 text-xs font-bold text-background"><Download className="h-3.5 w-3.5" /> Download PNG</button></> : <span className="text-center text-xs text-muted-foreground">Your QR code will appear here.</span>}</div></div>;
  return <div className="max-w-xl"><label htmlFor="utility-input" className="mb-2 block font-mono-ui text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Unix timestamp</label><div className="flex gap-2"><input id="utility-input" value={value} onChange={(event) => setValue(event.target.value)} placeholder="Leave empty for current time" className="h-11 min-w-0 flex-1 rounded-lg border border-input bg-background px-3 font-mono-ui text-sm" /><button type="button" onClick={() => { const date = value ? new Date(Number(value) * 1000) : new Date(); setOutput(Number.isNaN(date.getTime()) ? 'Enter a valid Unix timestamp.' : date.toLocaleString()); }} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"><RefreshCw className="h-4 w-4" /> Convert</button></div><div className="mt-5 rounded-xl bg-muted/60 p-5 font-mono-ui text-sm" data-testid="output-timestamp">{output || 'A readable date will appear here.'}</div></div>;
}

export function ToolWorkspace({ tool }: { tool: Tool }) {
  const isText = ['word-counter', 'character-counter', 'json-formatter', 'json-validator', 'text-case-converter', 'base64-encoder', 'base64-decoder', 'lorem-ipsum-generator', 'remove-duplicate-lines', 'remove-extra-spaces', 'reverse-text'].includes(tool.slug);
  const isImage = ['image-compressor', 'image-resizer', 'image-converter', 'image-cropper', 'image-to-pdf'].includes(tool.slug);
  return <section className="rounded-[1.5rem] border border-border bg-card p-5 shelf-shadow sm:p-8" data-testid={`workspace-${tool.slug}`}><WorkspaceHeader tool={tool} />{isText ? <TextTool tool={tool} /> : isImage ? <ImageWorkspace tool={tool} /> : tool.slug === 'password-generator' ? <PasswordTool /> : <UtilityTool tool={tool} />}<div className="mt-7 flex items-center gap-2 border-t border-border pt-5 text-xs text-muted-foreground"><Download className="h-3.5 w-3.5" /> Toolora keeps this work in your browser tab.</div></section>;
}