import { ChevronDownIcon } from '@heroicons/react/solid'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from 'twin.macro'

import renderChampRowWithCoreChamps from '~/component/display/components/renderChampRowWithCoreChamps'
import { Button, MutedCard } from '~/component/lib'
import { Tutorial } from '~/types'
import useHover from '~/utils/hooks/useHover'

import PreviewExpand from './components/PreviewExpand'
import PreviewRowHeader from './components/previewRowHeader'

const ExpandMore = styled((props: { expand: boolean; onClick: () => void }) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: '5px',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))
const PreviewRow = ({ item }: { item: Tutorial }) => {
  const coreChampbg = css`
    position: relative;
    ::before {
      content: '';
      position: absolute;
      width: 80%;
      height: calc(8rem - 12px);
      opacity: 0.45;
      backgroud: rgba(48, 48, 80, 1);
      border-radius: 12px;
      background-position: -250px 18%;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: linear-gradient(
          to right,
          transparent,
          transparent,
          transparent,
          transparent,
          rgba(38, 47, 58, 0),
          rgba(38, 47, 58, 0),
          rgba(48, 48, 80, 0.1),
          rgba(48, 48, 80, 0.3),
          rgba(48, 48, 80, 0.6),
          rgba(48, 48, 80, 0.8),
          rgba(48, 48, 80, 0.9),
          rgba(48, 48, 80, 1)
        ),
        url(//game.gtimg.cn/images/lol/tft/cham-icons/624x318/${item.content.champRow.coreChamps[0]
          .TFTID}.jpg);
    }
  `
  const hoverRef = useRef(null)
  const isHovered = useHover(hoverRef)
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    if (!isHovered) setExpanded(false)
  }, [isHovered])
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const navigate = useNavigate()
  return (
    <div role="button" ref={hoverRef} onClick={handleExpandClick}>
      <MutedCard additionalCSS=" hover:border-goldBorder border border-transparent relative ">
        {!item.published && (
          <div className="ribbon">
            <span>未发布</span>
          </div>
        )}
        <div css={coreChampbg} />
        <div className="relative grid grid-cols-10 ">
          <div className="col-span-3 px-1 py-4">
            <PreviewRowHeader
              title={item.title}
              version={item.version}
              tag={item.tag}
              dateUpdated={item.dateUpdated}
              author={item.authorName}
              authorImage={item.authorImage}
            />
          </div>
          <div className="flex items-center justify-start h-full col-span-5">
            {renderChampRowWithCoreChamps(
              item.content.champRow.coreChamps,
              item.content.champRow.champGroup
            )}
          </div>
          <div className="flex items-center justify-end col-span-2 ml-2 ">
            <Button
              type="warning"
              onClick={(e: MouseEvent<HTMLElement>) => {
                e.stopPropagation()
                navigate(`/teamcomps/display/${item.tutorialId}`)
              }}
              additionalCSS="h-fit text-sm">
              详情
            </Button>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ChevronDownIcon className="w-7 h-7 text-textColor " />
            </ExpandMore>
          </div>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <PreviewExpand originalChampGroup={item.content.champBoard} />
          </Collapse>
        </div>
      </MutedCard>
    </div>
  )
}

export default PreviewRow
