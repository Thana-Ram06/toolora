export type ToolCategory = 'Popular' | 'Text' | 'Files' | 'Developer' | 'Design' | 'Generators';

export type Tool = {
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  accent: 'teal' | 'coral' | 'gold' | 'ink';
  tags: string[];
  featured?: boolean;
  local?: boolean;
  kind: 'text' | 'file' | 'generator' | 'utility';
};

export const categories: { name: ToolCategory; description: string; icon: string }[] = [
  { name: 'Popular', description: 'The shortcuts people reach for most', icon: 'Sparkles' },
  { name: 'Text', description: 'Tidy, transform, and count words', icon: 'Type' },
  { name: 'Files', description: 'Lightweight file helpers, in your browser', icon: 'Files' },
  { name: 'Developer', description: 'Small helpers for code and data', icon: 'Code2' },
  { name: 'Design', description: 'Useful picks for visual work', icon: 'Palette' },
  { name: 'Generators', description: 'Make a clean starting point', icon: 'WandSparkles' },
];

export const tools: Tool[] = [
  { slug: 'image-compressor', name: 'Image Compressor', description: 'Make images lighter without leaving your browser.', category: 'Files', icon: 'ImageDown', accent: 'coral', tags: ['image', 'jpg', 'png', 'compress'], featured: true, local: true, kind: 'file' },
  { slug: 'image-resizer', name: 'Image Resizer', description: 'Resize an image to the exact dimensions you need.', category: 'Files', icon: 'Maximize2', accent: 'gold', tags: ['image', 'dimensions', 'resize'], featured: true, local: true, kind: 'file' },
  { slug: 'image-cropper', name: 'Image Cropper', description: 'Crop an image to a clean square, entirely in your browser.', category: 'Files', icon: 'Crop', accent: 'teal', tags: ['image', 'crop', 'square'], local: true, kind: 'file' },
  { slug: 'image-converter', name: 'Image Converter', description: 'Convert images between JPG, PNG, and WebP locally.', category: 'Files', icon: 'ArrowLeftRight', accent: 'ink', tags: ['image', 'jpg', 'png', 'webp', 'convert'], local: true, kind: 'file' },
  { slug: 'word-counter', name: 'Word Counter', description: 'A calm, precise count for words, characters, and reading time.', category: 'Text', icon: 'TextCursorInput', accent: 'teal', tags: ['words', 'writing'], featured: true, kind: 'text' },
  { slug: 'json-formatter', name: 'JSON Formatter', description: 'Turn dense JSON into something your eyes can follow.', category: 'Developer', icon: 'Braces', accent: 'gold', tags: ['json', 'pretty print'], featured: true, kind: 'text' },
  { slug: 'qr-code-generator', name: 'QR Code Generator', description: 'Create a sharp, downloadable QR code in seconds.', category: 'Generators', icon: 'ScanLine', accent: 'ink', tags: ['qr', 'share'], featured: true, kind: 'generator' },
  { slug: 'password-generator', name: 'Password Generator', description: 'Generate a strong password, instantly and privately.', category: 'Generators', icon: 'KeyRound', accent: 'teal', tags: ['security', 'random'], kind: 'generator' },
  { slug: 'color-picker', name: 'Color Picker', description: 'Pick a color and get the value you need.', category: 'Design', icon: 'Pipette', accent: 'coral', tags: ['hex', 'rgb', 'design'], kind: 'utility' },
  { slug: 'uuid-generator', name: 'UUID Generator', description: 'Create unique IDs for records, projects, and prototypes.', category: 'Developer', icon: 'Fingerprint', accent: 'gold', tags: ['uuid', 'id'], kind: 'generator' },
  { slug: 'base64-encoder', name: 'Base64 Encoder', description: 'Encode or decode text without sending it anywhere.', category: 'Developer', icon: 'Binary', accent: 'ink', tags: ['base64', 'encode'], local: true, kind: 'text' },
  { slug: 'base64-decoder', name: 'Base64 Decoder', description: 'Decode Base64 text locally and keep the result private.', category: 'Developer', icon: 'Binary', accent: 'ink', tags: ['base64', 'decode'], local: true, kind: 'text' },
  { slug: 'json-validator', name: 'JSON Validator', description: 'Check JSON syntax and get a clear pass or fail result.', category: 'Developer', icon: 'BadgeCheck', accent: 'gold', tags: ['json', 'validate'], kind: 'text' },
  { slug: 'text-case-converter', name: 'Text Case Converter', description: 'Switch between sentence, title, upper, and lower case.', category: 'Text', icon: 'CaseUpper', accent: 'teal', tags: ['case', 'copy'], kind: 'text' },
  { slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', description: 'Fill a layout with readable, adjustable placeholder copy.', category: 'Generators', icon: 'AlignLeft', accent: 'coral', tags: ['copy', 'prototype'], kind: 'generator' },
  { slug: 'remove-duplicate-lines', name: 'Remove Duplicate Lines', description: 'Clean repeated lines from a list in one click.', category: 'Text', icon: 'ListX', accent: 'teal', tags: ['text', 'clean', 'lines'], kind: 'text' },
  { slug: 'remove-extra-spaces', name: 'Remove Extra Spaces', description: 'Tidy spacing and blank lines without changing your words.', category: 'Text', icon: 'WrapText', accent: 'gold', tags: ['text', 'clean', 'spaces'], kind: 'text' },
  { slug: 'reverse-text', name: 'Reverse Text', description: 'Reverse characters in a string for quick experiments.', category: 'Text', icon: 'ArrowDownUp', accent: 'coral', tags: ['text', 'reverse'], kind: 'text' },
  { slug: 'character-counter', name: 'Character Counter', description: 'Count every character with or without spaces.', category: 'Text', icon: 'Hash', accent: 'ink', tags: ['text', 'characters', 'count'], kind: 'text' },
  { slug: 'timestamp-converter', name: 'Timestamp Converter', description: 'Move cleanly between Unix time and human dates.', category: 'Developer', icon: 'Clock3', accent: 'gold', tags: ['unix', 'date'], kind: 'utility' },
  { slug: 'image-to-pdf', name: 'Images to PDF', description: 'Bundle one or more images into a downloadable PDF.', category: 'Files', icon: 'FileOutput', accent: 'coral', tags: ['image', 'pdf', 'merge'], local: true, kind: 'file' },
];

export const getTool = (slug?: string) => tools.find((tool) => tool.slug === slug);