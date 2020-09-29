export type Theme = 'light' | 'dark';

export interface HeadingRendererProps {
  children: JSX.Element;
  level: number;
}

export interface LinkRendererProps {
  href: string;
  children: JSX.Element;
}

export interface ImageRendererProps {
  src: string;
  canonicalURL: string;
}

export interface MarkDownProps {
  source: string;
  canonicalURL: string;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  disablePrefixes?: boolean;
}

export interface RawCodeBlockProps {
  code: string;
  language: string;
  className: string;
  disablePrefixes: boolean;
}

export interface CSSTransitionProps {
  show: boolean;
  appear: boolean;
  children?: JSX.Element;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}
