import { XCircleIcon } from '@heroicons/react/solid'
import cn from 'classnames'
import { ChangeEvent, FC, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import tw, { css, styled } from 'twin.macro'

import Logo from '~/assets/Logo'
import { ChampionProps, InputAction, InputActionType } from '~/component/editor/types'
import { IProfile } from '~/types'

export const ChampCircle = ({ champ }: { champ: ChampionProps }) => {
  const champCostColorProperty: Record<string, string> = {
    '1': 'border-slate-400',
    '2': 'border-green-400',
    '3': 'border-blue-400',
    '4': 'border-pink-500',
    '5': 'border-orange-400',
  }
  const champCostColorRing = ` w-14 h-14  border-[3px]  rounded-full ${
    champCostColorProperty[champ.price]
  }`
  return (
    <>
      <div className={champCostColorRing}>
        <span className="z-10 block w-full h-full overflow-hidden rounded-full ">
          <img
            src={champ.url}
            alt={champ.name}
            className="block w-full h-full scale-110 rounded-full "
            draggable={false}
          />
        </span>
      </div>
    </>
  )
}
export const CalloutCard = ({
  additionalCSS,
  children,
}: {
  additionalCSS?: string
  children: ReactNode
}) => {
  const shadowEffect = css`
    box-shadow: -10px -10px 10px hsl(240, 25%, 11%), 10px 10px 9px hsl(240, 25%, 11%);
  `
  return (
    <div css={[tw` rounded-3xl`, shadowEffect]}>
      <div
        className={`fadeoutBorder ${additionalCSS}`}
        css={[tw`relative  rounded-3xl min-h-[6rem]  text-textColor`]}>
        {children}
      </div>
    </div>
  )
}

type MutedCardWithHeaderProps = {
  header?: ReactNode
  children: ReactNode
  additionalCSS?: string
}

export const MutedCardWithHeader: FC<MutedCardWithHeaderProps> = ({
  header,
  children,
  additionalCSS,
}: MutedCardWithHeaderProps) => {
  return (
    <div className={`flex w-full flex-col rounded-xl  bg-muted ${additionalCSS}`}>
      {header && (
        <div className="grid h-12 text-lg font-semibold place-content-center rounded-t-xl ">
          {header}
        </div>
      )}
      {children}
    </div>
  )
}
export const MutedCard = ({
  children,
  additionalCSS,
}: {
  children: ReactNode
  additionalCSS?: string
}) => {
  return (
    <div className={`flex w-full flex-col rounded-xl  bg-muted ${additionalCSS}`}>{children}</div>
  )
}

type CardProps = {
  children: ReactNode
}
export const Card: FC<CardProps> = ({ children }: CardProps) => {
  return (
    <div className="flex flex-col w-full h-full min-w-full border rounded-xl border-borderColor bg-callout">
      {children}
    </div>
  )
}

type CardWithHeaderFoooter = {
  header: ReactNode
  children: ReactNode
  footer?: ReactNode
}
export const CardWithHeaderFooter: FC<CardWithHeaderFoooter> = ({
  header,
  children,
  footer,
}: CardWithHeaderFoooter) => {
  return (
    <div className="flex flex-col w-full h-full min-w-full border rounded-xl border-borderColor bg-callout">
      <div className="grid h-12 text-lg font-bold place-content-center rounded-t-xl bg-cardDarkColor">
        {header}
      </div>
      {children}
      {footer && <div className="text-lg font-semibold rounded-b-xl bg-mutedColor">{footer}</div>}
    </div>
  )
}
type CardWithFoooter = {
  body: ReactNode
  footer: ReactNode
}
export const CardWithFooter: FC<CardWithFoooter> = ({ body, footer }: CardWithFoooter) => {
  return (
    <div className="flex flex-col w-full h-full min-w-full border rounded-xl border-borderColor bg-callout">
      {body}
      <div className="bg-mutedColor">{footer}</div>
    </div>
  )
}
const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 68px 0 42px;
  background: #272b30;
  color: #fcfcfc;
  border: 2px solid transparent;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.6;
  transition: all 0.2s;
  &:focus {
    border-color: #2a85ff;
  }
`
export const InputField = ({
  value,
  type,
  dispatch,
}: {
  value: string
  type: InputActionType
  dispatch: (action: InputAction) => void
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type, payload: e.target.value })
  }
  return (
    <Input
      type="text"
      value={value}
      onChange={(evt) => handleChange(evt)}
      placeholder="Search or type a command"
    />
  )
}

export const ErrorMSG = ({ errorMSG, isShown }: { errorMSG: string; isShown: boolean }) => {
  return (
    <div
      className={`rounded-md bg-redColor p-1 transition-opacity duration-[2000ms] ${
        isShown && 'opacity-0'
      }`}>
      <div className="flex text-textColor">
        <div className="flex-shrink-0 ">
          <XCircleIcon className="w-5 h-5 x" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium ">{errorMSG}</h3>
        </div>
      </div>
    </div>
  )
}
export function SinkinTextArea({
  value,
  handleChange,
  rows = 3,
  withPlaceholder = true,
}: {
  value: string
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  withPlaceholder?: boolean
}) {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => handleChange(e)}
      name="name"
      id="name"
      className="block w-full p-4 placeholder-gray-500 border-0 resize-none rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-red-600 focus:ring-0 sm:text-sm"
      placeholder={withPlaceholder ? '*' : ''}
      style={{
        boxShadow: 'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
      }}
    />
  )
}
export function SinkinInputField({
  value,
  handleChange = () => {},
  withPlaceholder = true,
}: {
  value: string
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void
  withPlaceholder?: boolean
}) {
  return (
    <input
      value={value}
      onChange={(e) => handleChange(e)}
      name="name"
      id="name"
      className="block w-full p-4 placeholder-gray-500 border-0 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-red-600 focus:ring-0 sm:text-sm"
      placeholder={withPlaceholder ? '*' : ''}
      style={{
        boxShadow: 'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
      }}
    />
  )
}
export function TextInputWithTitle({
  label,
  value,
  handleChange,
  type,
  rows,
}: {
  label?: string
  value: string
  rows?: number
  type: InputActionType
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    type: InputActionType
  ) => void
}) {
  return (
    <div className="relative rounded-md shadow-sm ">
      {label && (
        <label
          htmlFor="name"
          className="absolute inline-block px-1 -mt-px font-semibold -top-2 left-3 text-textColor">
          {label}
        </label>
      )}
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => handleChange(e, type)}
          name="name"
          id="name"
          className="block w-full px-4 pt-5 pb-3 placeholder-gray-500 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-red-600"
          placeholder="*"
          style={{
            boxShadow:
              'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
          }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => handleChange(e, type)}
          name="name"
          id="name"
          className="block w-full px-4 pt-5 pb-3 text-xl placeholder-gray-500 rounded-2xl bg-sinkIn text-textColor shadow-borderColor placeholder:text-red-600"
          placeholder="*"
          style={{
            boxShadow:
              'inset -5px -5px 10px hsl(240, 25%, 20%), inset 5px 5px 9px hsl(240, 25%, 11%)',
          }}
        />
      )}
    </div>
  )
}
export const LogoWithSlogan = () => {
  return (
    <div className="flex flex-col p-4">
      <div className="flex">
        <div className="w-16">
          <Logo />
        </div>

        <div className="flex items-center pl-4 text-4xl kidFont">玩者攻略</div>
      </div>
      <div className="flex pt-3 pl-24">
        <span className="block px-2 text-2xl text-lightGray rotate-6 max-w-fit kidFont doubleCross">
          老6
        </span>
        <span className="block pl-2 text-3xl max-w-fit kidFont ">王者模式</span>
      </div>
    </div>
  )
}
export const CoreChampBadge = () => {
  const BadgeCharacter = styled.div`
    top: 10px;
    right: -17px;
    font-size: 1.5rem;
    ${tw`absolute z-50 text-textColor w-[50px] font-bold`}
  `
  return (
    <>
      <svg viewBox="0 0 84 96">
        <defs>
          <linearGradient id="badgeColor" x1=".5" x2=".5" y2="1">
            <stop stopColor="#f73058" />
            <stop offset=".54" stopColor="#fa3d49" />
            <stop offset=".71" stopColor="#fb4b3c" />
            <stop offset=".87" stopColor="#fc8378" />
            <stop offset=".95" stopColor="#fdccc8" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <path
          stroke="none"
          strokeWidth="4"
          fill="url(#badgeColor)"
          d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
          transform="translate(-184, 0)"
          id="slot-overlay"
        />
        <path
          stroke="hsl(240, 25%, 15%)"
          strokeWidth="8"
          fill="none"
          className="slot-border"
          d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
          transform="translate(-184, 0)"
        />
      </svg>
      <BadgeCharacter>C</BadgeCharacter>
    </>
  )
}
export const HexBadge = ({ tierName }: { tierName: '1' | '2' | '3' }) => {
  const BadgeCharacter = styled.div`
    top: 8px;
    right: 6px;
    font-size: 1rem;
    writing-mode: vertical-rl;
    text-orientation: upright;
    ${tw`absolute z-50 font-bold text-muted`}
  `
  const PolygonBadge = () => {
    switch (tierName) {
      case '1':
        return (
          <defs>
            <linearGradient id={tierName} x1="1" y1="1" x2="0">
              <stop stopColor="#bdd4e7" />
              <stop offset=".74" stopColor="#8693ab" />
            </linearGradient>
          </defs>
        )
      case '2':
        return (
          <defs>
            <linearGradient id={tierName} x1="1" y1="1" x2="0">
              <stop stopColor="#CD7F32" />
              <stop offset=".74" stopColor="#fbd72b" />
            </linearGradient>
          </defs>
        )
      case '3':
        return (
          <defs>
            <linearGradient id={tierName} x1="103.96%" y1="95.28%" x2="-3.96%" y2="4.72%">
              <stop stopColor="#7d93f2" />
              <stop offset=".13" stopColor="#9489f5" />
              <stop offset=".23" stopColor="#c099fa" />
              <stop offset=".31" stopColor="#e1a5fd" />
              <stop offset=".38" stopColor="#b7aaf9" />
              <stop offset=".44" stopColor="#aec5f4" />
              <stop offset=".49" stopColor="#aee6ef" />
              <stop offset=".55" stopColor="#b7f1cf" />
              <stop offset=".61" stopColor="#cff2c0" />
              <stop offset=".68" stopColor="#f3f1c8" />
              <stop offset=".76" stopColor="#efdeae" />
              <stop offset=".86" stopColor="#edc397" />
              <stop offset="1" stopColor="#e99f7c" />
            </linearGradient>
          </defs>
        )
      default:
        break
    }
  }
  return (
    <>
      <svg viewBox="0 0 26 32">
        <defs>{PolygonBadge()}</defs>
        <path
          fill={`url(#${tierName})`}
          d="M22,3H10C8.9,3,8,3.9,8,5v22.6c0,0.8,0.5,1.5,1.2,1.8c0.8,0.3,1.6,0.1,2.2-0.4l4.6-4.6l4.6,4.6c0.4,0.4,0.9,0.6,1.4,0.6
	c0.3,0,0.5,0,0.8-0.2c0.8-0.3,1.2-1,1.2-1.8V5C24,3.9,23.1,3,22,3z"
        />
      </svg>
      <BadgeCharacter>{`${tierName}级`}</BadgeCharacter>
    </>
  )
}
export const DividerWithIcon = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-textColor" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 text-gray-500 ">
          <svg
            className="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              fill="#ededff"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  )
}

export const InfoButtonSwitchable = ({
  children,
  onClick,
  name,
  additionalCSS,
  disabled = false,
  active,
}: {
  children: ReactNode
  onClick: () => void
  name?: string
  additionalCSS?: string
  disabled?: boolean
  active: boolean
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn({ active }, `btn btn-deluxe btn-info btn-deluxe-switchable ${additionalCSS}`)}
      onClick={onClick}>
      <span className="btn-deluxe-edge" />
      <span className=" btn-deluxe-front">
        <div className="flex justify-center">
          {name && <span className="sr-only">{name}</span>}
          {children}
        </div>
      </span>
    </button>
  )
}

export const Button = ({
  children,
  onClick,
  name,
  additionalCSS,
  disabled = false,
  type = 'primary',
  isSmall = false,
  isFormSubmit = false,
}: {
  type?: 'primary' | 'secondary' | 'warning' | 'info' | 'danger'
  isFormSubmit?: boolean
  children: ReactNode
  onClick?: (() => void) | ((e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void)
  name?: string
  additionalCSS?: string
  disabled?: boolean
  isSmall?: boolean
}) => {
  return (
    <button
      type={isFormSubmit ? 'submit' : 'button'}
      disabled={disabled}
      className={cn(`btn btn-deluxe btn-${type} ${additionalCSS}`, {
        'btn-sm': isSmall,
      })}
      onClick={onClick}>
      <span className="btn-deluxe-edge" />
      <span className=" btn-deluxe-front">
        <div className="flex justify-center">
          {name && <span className="sr-only">{name}</span>}
          {children}
        </div>
      </span>
    </button>
  )
}

export const Avatar = ({
  profileName,
  profileImage = '',
  size = 7,
  showBorder = false,
  showName = false,
}: {
  profileName: string
  profileImage?: string
  size?: number
  showBorder?: boolean
  showName?: boolean
}) => {
  // <div
  //     className="flex items-center gap-2"
  //     role="button"
  //     onClick={() => navigate(`/teamcomps/author/${author}`)}>
  //     {authorImage ? (
  //       <img
  //         className="inline-block rounded-full w-7 h-7"
  //         src={authorImage}
  //         alt=""
  //       />
  //     ) : (
  //       <AvatarPlaceHolder avatarSize={7} />
  //     )}

  //     <div className="text-sm text-goldBorder">{author}</div>
  return (
    <Link to={`/teamcomps/author/${profileName}`} className="flex-shrink-0 block group">
      <div className="flex items-center">
        {profileImage ? (
          <img
            className={cn(`inline-block w-${size} h-${size}  rounded-full border-gray-300`, {
              border: showBorder,
            })}
            src={profileImage}
            alt=""
          />
        ) : (
          <AvatarPlaceHolder size={size} />
        )}
        {showName && (
          <p className="ml-2 text-sm text-goldBorder group-hover:text-orange-400">{profileName}</p>
        )}
      </div>
    </Link>
  )
}

export const SinkInButton = ({
  children,
  onClick,
  additionalCSS,
}: {
  children: ReactNode
  onClick: () => void
  additionalCSS?: string
}) => {
  const cssProperty = cn(
    'inline-flex justify-center px-4 py-2 text-sm font-semibold border border-gray-300 shadow-sm text-textColor rounded-xl bg-sinkIn hover:bg-lightGray hover:text-darkeGray focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-secondaryColor',
    additionalCSS
  )

  return (
    <button type="button" className={cssProperty} onClick={onClick}>
      {children}
    </button>
  )
}

export function FullPageErrorFallback({ error }: { error: Error }) {
  return (
    <div
      role="alert"
      css={{
        color: 'red',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <p>Uh oh... There's a problem. Try refreshing the app.</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export function MutedBadge({ text, additionalCSS }: { text: string; additionalCSS?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-300 text-gray-800 ${additionalCSS}`}>
      {text}
    </span>
  )
}
export function GreenBadge({ text, additionalCSS }: { text: string; additionalCSS?: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ${additionalCSS}`}>
      {text}
    </span>
  )
}
export function Badge({
  text,
  additionalCSS,
  tag = '存钱慢D',
}: {
  text: string
  additionalCSS?: string
  tag?: string
}) {
  return (
    <span
      className={cn(
        `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium   ${additionalCSS}`,
        { 'bg-[#f9f9fa] text-gray-800 ': tag === '存钱慢D' },
        { 'bg-[#3dd5f3] text-gray-800 ': tag === '稳定运营' },
        { 'bg-[#c5303f] text-textColor ': tag === '快速上8' }
      )}>
      {text}
    </span>
  )
}

export function AvatarPlaceHolder({ size, borderSize = 2 }: { size: number; borderSize?: number }) {
  return (
    <span
      className={`inline-block w-${size} h-${size} overflow-hidden bg-gray-100 border-${borderSize} rounded-full border-callout `}>
      <svg className="w-full h-full text-gray-300 " fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  )
}
export function FilterWithRadio({
  filterArr,
  handleChange,
}: {
  filterArr: { id: string; title: string }[]
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <fieldset>
      <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
        {filterArr.map((item) => (
          <div key={item.id} className="flex items-center">
            <input
              id={item.id}
              name="notification-method"
              type="radio"
              defaultChecked={item.id === 'all'}
              className="w-4 h-4 border-gray-300 accent-goldBorder "
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor={item.id} className="block ml-3 text-sm font-medium text-textColor">
              {item.title}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

const FilterMultiple = () => {
  const activeFilters = [{ value: 'objects', label: 'Objects' }]

  return (
    <div className="">
      <div className="px-4 py-3 mx-auto max-w-7xl sm:flex sm:items-center sm:px-6 lg:px-8">
        <h3 className="font-semibold ">过滤</h3>

        <div aria-hidden="true" className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4" />

        <div className="mt-2 sm:mt-0 sm:ml-4">
          <div className="flex flex-wrap items-center -m-1">
            {activeFilters.map((activeFilter) => (
              <span
                key={activeFilter.value}
                className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900">
                <span>{activeFilter.label}</span>
                <button
                  type="button"
                  className="inline-flex flex-shrink-0 w-4 h-4 p-1 ml-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500">
                  <svg className="w-2 h-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
