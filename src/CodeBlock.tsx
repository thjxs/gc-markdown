import * as React from 'react';
import Highlight, { Prism } from 'prism-react-renderer';
import light from 'prism-react-renderer/themes/github';
import dark from 'prism-react-renderer/themes/duotoneDark';
import ThemeContext from './ThemeContext';
import { CodeBlockProps, RawCodeBlockProps, Theme } from './interface';

function codeTheme(theme: Theme) {
  return theme === 'light' ? light : dark;
}

function RawCodeBlock({
  code,
  language,
  className: extraClassName,
  disablePrefixes,
}: RawCodeBlockProps) {
  const theme = React.useContext(ThemeContext);
  const lang =
    language === 'shell' ? 'bash' : language === 'text' ? 'diff' : language;
  return (
    <Highlight
      Prism={Prism}
      theme={codeTheme(theme)}
      code={code}
      language={lang}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className + ' flex overflow-y-auto ' + (extraClassName ?? '')
          }
          style={{ ...style }}
        >
          {!disablePrefixes && tokens.length === 1 && lang === 'bash' && (
            <code className="pr-2 sm:pr-3">
              <div className="text-gray-400 token-line text-right select-none">
                $
              </div>
            </code>
          )}
          {tokens.length > 1 && !disablePrefixes && (
            <code className="pr-2 sm:pr-3">
              {tokens.map((line, i) =>
                line[0]?.empty && i === tokens.length - 1 ? null : (
                  <div
                    key={i + '1'}
                    className="text-gray-400 token-line text-right select-none"
                  >
                    {i + 1}{' '}
                  </div>
                )
              )}
            </code>
          )}
          <code>
            {tokens.map((line, i) =>
              line[0]?.empty && i === tokens.length - 1 ? null : (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })}></span>
                  ))}
                  {line[0]?.empty ? '\n' : ''}
                </div>
              )
            )}
          </code>
        </pre>
      )}
    </Highlight>
  );
}

function CodeBlock({
  code,
  language,
  disablePrefixes,
}: CodeBlockProps): JSX.Element {
  return (
    <RawCodeBlock
      code={code}
      language={language}
      disablePrefixes={disablePrefixes}
      className="rounded border border-gray-200 p-1 px-2 sm:px-3"
    />
  );
}

export default CodeBlock;
