import * as React from 'react';
function InlineCode({ children }) {
    return (React.createElement("code", { className: "py-0.5 px-1 font-mono rounded-sm bg-gray-100" }, children));
}
export default InlineCode;
