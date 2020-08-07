import * as React from 'react';

function InlineCode({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  return (
    <code className="py-0.5 px-1 font-mono rounded-sm bg-gray-100">
      {children}
    </code>
  );
}

export default InlineCode;
