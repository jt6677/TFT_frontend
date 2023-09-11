import { BlueBadge, GreenBadge, MutedBadge } from '~/component/lib'

const Header = ({
version,
title,
author,
}: {
version: string
title: string
author: string
}) => {
return (
<div className="flex flex-col col-span-2 gap-3 p-5">
<div className="text-3xl font-bold opacity-100 text-textColor">
{title}
</div>
<div className="flex gap-2">
<MutedBadge text={version} additionalCSS="w-fit" />
<GreenBadge text="快速8" additionalCSS="w-fit" />
<BlueBadge text="搞笑" additionalCSS="w-fit" />
</div>
<div className="flex items-center gap-2">
<img
          className="inline-block rounded-full w-7 h-7"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
<div className=" text-goldBorder">{author}</div>
</div>
</div>
)
}
export default Header
