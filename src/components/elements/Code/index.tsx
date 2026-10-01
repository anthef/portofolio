import React from 'react'

const KEYWORDS = new Set(['import', 'from', 'as', 'def', 'return', 'in', 'and', 'or', 'not', 'True', 'False', 'None', 'for', 'if'])

// strings | numbers | call names | identifiers | punctuation | whitespace
const TOKEN = /("[^"]*"|'[^']*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)(?=\()|([A-Za-z_]\w*)|([^\w\s])|(\s+)/g

// Tiny Python-flavoured highlighter for the one-line snippets used as section labels.
export const Code: React.FC<{ children: string; className?: string }> = ({ children, className = '' }) => {
  const parts: React.ReactNode[] = []
  let match: RegExpExecArray | null
  let key = 0
  TOKEN.lastIndex = 0

  while ((match = TOKEN.exec(children)) !== null) {
    const [token, str, num, call, ident, punct] = match
    let tone = ''
    if (str) tone = 'text-accent'
    else if (num) tone = 'text-series-2'
    else if (call) tone = 'text-ink'
    else if (ident) tone = KEYWORDS.has(ident) ? 'text-series-3' : 'text-text'
    else if (punct) tone = 'text-faint'
    parts.push(
      tone ? (
        <span key={key++} className={tone}>
          {token}
        </span>
      ) : (
        token
      )
    )
  }

  return <code className={`font-mono ${className}`}>{parts}</code>
}
