import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
function flatten(text, child) {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
}
function slugify(text) {
    text = text.toLowerCase();
    text = text.split(' ').join('-');
    text = text.split(/\t/).join('--');
    text = text.split(/[|$&`~=\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
    text = text
        .split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/)
        .join('');
    return text;
}
function HeadingRenderer(props) {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, '');
    const id = slugify(text);
    return React.createElement('h' + props.level, { id }, React.createElement("a", { href: '#' + id, className: "hover:underline" }, props.children));
}
function LinkRenderer(props) {
    const currentPath = new URL('/', 'https://deno.land').pathname;
    let href = undefined;
    if (props.href &&
        (props.href.startsWith('./') || props.href.startsWith('../')) &&
        currentPath.startsWith('/manual')) {
        href = props.href.replace(/\.md$/, '');
    }
    else {
        href = props.href;
    }
    return (React.createElement("a", { href: href, className: "link" }, props.children));
}
function CodeRenderer(props) {
    return React.createElement(CodeBlock, Object.assign({}, Object.assign(Object.assign({}, props), { code: props.value, value: undefined })));
}
function ImageRenderer(props) {
    let src = props.src;
    if ((src === null || src === void 0 ? void 0 : src.startsWith('./')) || (src === null || src === void 0 ? void 0 : src.startsWith('../'))) {
        const url = new URL(props.canonicalURL);
        const parts = url.pathname.split('/');
        parts.pop();
        url.pathname = parts.join('/') + '/' + src;
        src = url.href;
    }
    return (React.createElement("a", { href: src },
        React.createElement("img", { src: src, className: "max-w-full inline-block" })));
}
const renderers = (canonicalURL) => ({
    inlineCode: InlineCode,
    code: CodeRenderer,
    heading: HeadingRenderer,
    link: LinkRenderer,
    image: function ImageRendererWrapper(props) {
        return React.createElement(ImageRenderer, Object.assign({}, props, { canonicalURL: canonicalURL }));
    },
});
function Markdown(props) {
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
    return (React.createElement(ReactMarkdown, { source: props.source, renderers: renderers(props.canonicalURL), skipHtml: true, className: "markdown" }));
}
export default Markdown;
