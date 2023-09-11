import TimeAgo from 'timeago-react'

import { Avatar, Badge, MutedBadge } from '~/component/lib'

function PreviewRowHeader({
  title,
  version,
  dateUpdated,
  author,
  authorImage,
  tag,
}: {
  title: string
  version: string
  dateUpdated: string
  author: string
  authorImage: string
  tag: string
}) {
  return (
    <div className="flex flex-col col-span-2 gap-2">
      <p className="overflow-hidden text-[13px] font-bold truncate opacity-100 text-textColor text-ellipsis ">
        {title}
      </p>
      <div className="flex gap-2">
        <MutedBadge text={version} additionalCSS="w-fit" />
        <Badge text={tag} additionalCSS="w-fit" tag={tag} />
      </div>
      <div className="flex items-center gap-2" role="button">
        <Avatar profileName={author} profileImage={authorImage} size={7} showName />
        <TimeAgo datetime={dateUpdated} className="text-xs" locale="zh_CN" />
      </div>
    </div>
  )
}
export default PreviewRowHeader
