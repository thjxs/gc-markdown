import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import {
  HeadingRendererProps,
  LinkRendererProps,
  ImageRendererProps,
  MarkDownProps,
} from './interface';

function flatten(text: string, child: string | React.ReactElement) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function slugify(text: string) {
  text = text.toLowerCase();
  text = text.split(' ').join('-');
  text = text.split(/\t/).join('--');
  text = text.split(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
  text = text
    .split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/)
    .join('');

  return text;
}

function HeadingRenderer(props: HeadingRendererProps) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const id = slugify(text);
  return React.createElement(
    'h' + props.level,
    { id },
    <a href={'#' + id} className="hover:underline">
      {props.children}
    </a>
  );
}

function LinkRenderer(props: LinkRendererProps) {
  const currentPath = new URL('/', 'https://deno.land').pathname;
  let href = undefined;
  if (
    props.href &&
    (props.href.startsWith('./') || props.href.startsWith('../')) &&
    currentPath.startsWith('/manual')
  ) {
    href = props.href.replace(/\.md$/, '');
  } else {
    href = props.href;
  }

  return (
    <a href={href} className="link">
      {props.children}
    </a>
  );
}

function CodeRenderer(props: { value: string }): JSX.Element {
  return <CodeBlock {...{ ...props, code: props.value, value: undefined }} />;
}

function ImageRenderer(props: ImageRendererProps) {
  let src = props.src;

  if (src?.startsWith('./') || src?.startsWith('../')) {
    const url = new URL(props.canonicalURL);
    const parts = url.pathname.split('/');
    parts.pop();
    url.pathname = parts.join('/') + '/' + src;
    src = url.href;
  }

  return (
    <a href={src}>
      <img src={src} className="max-w-full inline-block" />
    </a>
  );
}

const renderers = (canonicalURL: string) => ({
  inlineCode: InlineCode,
  code: CodeRenderer,
  heading: HeadingRenderer,
  link: LinkRenderer,
  image: function ImageRendererWrapper(props) {
    return <ImageRenderer {...props} canonicalURL={canonicalURL} />;
  },
});

function Markdown(props: MarkDownProps): JSX.Element {
  React.useEffect(() => {
    let { hash } = location;
    hash = hash && hash.substring(1);
    if (!hash) {
      return;
    }
    const el = document.getElementById(hash);
    if (!el) {
      return;
    }
    setTimeout(() => {
      el.scrollIntoView();
    }, 0);
  }, []);

  if (!props.source) {
    return null;
  }

  return (
    <ReactMarkdown
      source={props.source}
      renderers={renderers(props.canonicalURL)}
      skipHtml={true}
      className="markdown"
    />
  );
}

export default Markdown;
