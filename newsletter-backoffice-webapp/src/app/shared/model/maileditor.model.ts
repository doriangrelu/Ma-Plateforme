export type ElementKind = 'heading' | 'text' | 'image' | 'link' | 'button';

export interface BaseEl {
  id: string;
  kind: ElementKind;
}

export interface HeadingEl extends BaseEl {
  kind: 'heading';
  level: 1 | 2 | 3 | 4;
  text: string;
  align?: 'left' | 'center' | 'right';
}

export interface TextEl extends BaseEl {
  kind: 'text';
  html: string; // autorise <b>, <i>, <br>, etc.
}

export interface ImageEl extends BaseEl {
  kind: 'image';
  src: string;
  alt?: string;
  href?: string;
}

export interface LinkEl extends BaseEl {
  kind: 'link';
  text: string;
  href: string;
}

export interface ButtonEl extends BaseEl {
  kind: 'button';
  text: string;
  href: string;
  align?: 'left' | 'center' | 'right';
}

export type MailElement = HeadingEl | TextEl | ImageEl | LinkEl | ButtonEl;

export interface Column {
  id: string;
  element?: MailElement | null;
}

export interface Block {
  id: string;
  layout: '1col' | '2col' | '3col'; // V1 simple
  columns: Column[];
  backgroundColor?: string; // ex: '#ffffff' (optionnel)
  padding?: string; // ex: '20px 0'
}

export interface Lib {
  type: string;
  icon: string;
  label: string;
}
