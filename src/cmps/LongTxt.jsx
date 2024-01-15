import { useState } from "react"

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <span>
      {(length <= 100 && txt) || (
        <span>
          {isExpanded ? txt : txt.substring(0, 100) + ' ...'}
          <span className="flex items-center"
            style={{ cursor: 'pointer', color: 'rgb(115,115,115)' }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '' : 'more'}
          </span>
        </span>
      )}
    </span>
  )
}
