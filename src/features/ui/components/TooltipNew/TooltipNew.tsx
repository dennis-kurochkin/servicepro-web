import { ReactElement, ReactNode } from 'react'
import { PlacesType, Tooltip } from 'react-tooltip'
import { renderToStaticMarkup } from 'react-dom/server'
import { TooltipId } from '@data/tooltips'

interface TooltipNewProps {
  id: TooltipId
  place?: PlacesType
  strategy?: 'absolute' | 'fixed'
  content: string | ReactElement
  target: ReactNode
}

export const TooltipNew = ({ id, strategy = 'absolute', place, content, target }: TooltipNewProps) => {
  return (
    <>
      <Tooltip
        id={id}
      />
      <div
        className={'servicepro-tooltip'}
        data-tooltip-id={id}
        data-tooltip-place={place}
        data-tooltip-position-strategy={strategy}
        data-tooltip-html={typeof content === 'string' ? content : renderToStaticMarkup(content)}
      >
        {target}
      </div>
    </>
  )
}
