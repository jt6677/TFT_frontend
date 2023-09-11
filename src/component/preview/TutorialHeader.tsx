import { css } from 'twin.macro'

import { Avatar, Badge, GreenBadge } from '~/component/lib'

const TutorialHeader = ({
  version,
  title,
  author,
  authorImage,
  TFTID,
  tag,
  published = true,
}: {
  version: string
  title: string
  author: string
  authorImage: string
  TFTID: string
  tag: string
  published?: boolean
}) => {
  const coreChampbg = css`
    position: relative;
    ::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 9rem;
      opacity: 0.7;
      border-radius: 12px;
      background-position: 10% 25%;
      background-repeat: no-repeat;
      background-size: 100%;
      background-image: linear-gradient(
          to right,
          rgba(48, 48, 80, 1),
          rgba(48, 48, 80, 0.8),
          rgba(48, 48, 80, 0.7),
          rgba(48, 48, 80, 0.5),
          rgba(48, 48, 80, 0.4),
          rgba(38, 47, 58, 0),
          rgba(38, 47, 58, 0),
          rgba(38, 47, 58, 0),
          transparent
        ),
        url(//game.gtimg.cn/images/lol/tft/cham-icons/624x318/${TFTID}.jpg);
    }
  `
  return (
    <div className="w-full h-36">
      <div css={coreChampbg}>
        {!published && (
          <div className="ribbon">
            <span>未发布</span>
          </div>
        )}
        <div className="relative ">
          <div className="flex flex-col col-span-2 gap-3 p-5">
            <div className="text-3xl font-bold opacity-100 text-textColor">{title}</div>
            <div className="flex gap-2">
              <GreenBadge text={version} additionalCSS="w-fit" />
              <Badge text={tag} additionalCSS="w-fit" tag={tag} />
            </div>

            <Avatar size={9} profileImage={authorImage} profileName={author} showName />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorialHeader
