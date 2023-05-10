import * as React from 'react';

type CodeBlockProps = React.HTMLProps<HTMLPreElement> & {
  children: string | string[];
  language?: 'json';
};

const CodeBlock = ({
  children,
  language = 'json',
  ...rest
}: CodeBlockProps) => {
  return (
    <pre
      className="mb-4 mt-2 overflow-x-auto overflow-y-hidden bg-stone-100 p-4"
      {...rest}
      data-language={language}
    >
      <code>{children}</code>
    </pre>
  );
};

export default CodeBlock;
