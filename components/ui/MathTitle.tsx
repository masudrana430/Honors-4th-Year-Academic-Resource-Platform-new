import React from 'react';
import katex from 'katex';

type MathTitleProps = {
  text: string;
  className?: string;
  mathClassName?: string;
};

/** Render inline LaTeX fragments in an otherwise ordinary title. */
export function MathTitle({ text, className, mathClassName }: MathTitleProps) {
  const parts = text.split(/(\$[^$]+\$)/g);

  return (
    <span className={className} style={{ overflowWrap: 'anywhere' }}>
      {parts.map((part, index) => {
        const isMath = part.startsWith('$') && part.endsWith('$') && part.length > 2;
        if (!isMath) return <React.Fragment key={index}>{part}</React.Fragment>;

        const html = katex.renderToString(part.slice(1, -1), {
          displayMode: false,
          throwOnError: false,
          strict: 'ignore',
          trust: false,
          output: 'htmlAndMathml',
        });

        return (
          <span
            key={index}
            className={['math-title-inline', mathClassName].filter(Boolean).join(' ')}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
}
