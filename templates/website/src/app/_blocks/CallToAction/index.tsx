import React from 'react'
import RichText from 'src/app/_components/RichText'

import type { Page } from '../../../payload-types'

import { CMSLink } from '../../_components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'cta' }>

export const CallToActionBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ invertBackground, links, richText }) => {
  return (
    <div className="container">
      <div className="classes.wrap">
        <div className="max-w-[48rem] mb-8">
          <RichText className="classes.richText" content={richText} enableGutter={false} />
        </div>
        <div className="flex gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
