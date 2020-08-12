import * as React from 'react';
import Highlight, { Prism } from 'prism-react-renderer';
import light from 'prism-react-renderer/themes/github';
import dark from 'prism-react-renderer/themes/duotoneDark';
import DarkModeContext from './DarkModeContext';
function RawCodeBlock({ code, language, className: extraClassName, disablePrefixes, }) {
    const darkMode = React.useContext(DarkModeContext);
    const theme = darkMode ? dark : light;
    const lang = language === 'shell' ? 'bash' : language === 'text' ? 'diff' : language;
    return (React.createElement(Highlight, { Prism: Prism, theme: theme, code: code, language: lang }, ({ className, style, tokens, getLineProps, getTokenProps }) => (React.createElement("pre", { className: className + ' flex overflow-y-auto ' + (extraClassName !== null && extraClassName !== void 0 ? extraClassName : ''), style: Object.assign({}, style) },
        !disablePrefixes && tokens.length === 1 && lang === 'bash' && (React.createElement("code", { className: "pr-2 sm:pr-3" },
            React.createElement("div", { className: "text-gray-400 token-line text-right select-none" }, "$"))),
        tokens.length > 1 && !disablePrefixes && (React.createElement("code", { className: "pr-2 sm:pr-3" }, tokens.map((line, i) => {
            var _a;
            return ((_a = line[0]) === null || _a === void 0 ? void 0 : _a.empty) && i === tokens.length - 1 ? null : (React.createElement("div", { key: i + '1', className: "text-gray-400 token-line text-right select-none" },
                i + 1,
                ' '));
        }))),
        React.createElement("code", null, tokens.map((line, i) => {
            var _a, _b;
            return ((_a = line[0]) === null || _a === void 0 ? void 0 : _a.empty) && i === tokens.length - 1 ? null : (React.createElement("div", Object.assign({ key: i }, getLineProps({ line, key: i })),
                line.map((token, key) => (React.createElement("span", Object.assign({ key: key }, getTokenProps({ token, key }))))),
                ((_b = line[0]) === null || _b === void 0 ? void 0 : _b.empty) ? '\n' : ''));
        }))))));
}
function CodeBlock({ code, language, disablePrefixes, }) {
    return (React.createElement(RawCodeBlock, { code: code, language: language, disablePrefixes: disablePrefixes, className: "rounded border border-gray-200 p-1 px-2 sm:px-3" }));
}
export default CodeBlock;
