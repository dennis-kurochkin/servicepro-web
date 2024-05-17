import { ReactElement, ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'
import { renderToStaticMarkup } from 'react-dom/server'
import { TooltipId } from '@data/tooltips'

interface TooltipNewProps {
  id: TooltipId
  content: string | ReactElement
  target: ReactNode
}

export const TooltipNew = ({ id, content, target }: TooltipNewProps) => {
  return (
    <>
      <Tooltip
        id={id}
      />
      <div
        className={'servicepro-tooltip'}
        data-tooltip-id={id}
        data-tooltip-html={typeof content === 'string' ? content : renderToStaticMarkup(content)}
      >
        {target}
      </div>
    </>
  )
}
