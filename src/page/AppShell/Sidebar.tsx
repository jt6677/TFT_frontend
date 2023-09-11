import classNames from 'classnames'
import { NavLink, useMatch } from 'react-router-dom'
import tw, { css } from 'twin.macro'

import Logo from '~/assets/Logo'
import { NavItem } from '~/types'

function Sidebar({ navigation }: { navigation: NavItem[] }) {
  const currentStyle = css`
    background-color: #2876f9;
    background-image: linear-gradient(315deg, #2876f9 0%, #6d17cb 74%);
    ${tw`border-r-2 border-brightGold text-textColor`};
  `
  const hoverStyle = css`
    &:hover {
      ${tw`text-white border-r-2 border-white bg-bright`};
    }
  `
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-sinkIn">
      <div className="flex items-center flex-shrink-0 h-12 px-4 bg-sinkIn">
        <div className="w-10">
          <Logo />
        </div>
        <div className="pl-4 text-3xl kidFont">玩者攻略</div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div>
          <nav className="flex-1 py-4 space-y-1">
            {navigation.map((item) => {
              const match = useMatch(item.url)
              return (
                <NavLink
                  key={item.name}
                  to={item.url}
                  css={[match && currentStyle, !match && hoverStyle]}
                  className={classNames(
                    'group flex items-center px-6 py-3  font-semibold  text-gray-300   '
                  )}>
                  <item.icon // @ts-ignore
                    className={classNames(
                      match ? 'text-textColor' : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
