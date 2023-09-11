const CoreChampBadgeRow = () => {
  return (
    <>
      <svg viewBox="0 0 84 96">
        <defs>
          <clipPath id="polygon">
            <polygon
              points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72"
              transform="translate(-184, 0)"
            />
          </clipPath>
        </defs>
        <linearGradient id="g1" x1=".5" x2=".5" y2="1">
          <stop stopColor="#f73058" />
          <stop offset=".54" stopColor="#fa3d49" />
          <stop offset=".71" stopColor="#fb4b3c" />
          <stop offset=".87" stopColor="#fc8378" />
          <stop offset=".95" stopColor="#fdccc8" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <path
          stroke="none"
          strokeWidth="4"
          fill="url(#g1)"
          d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
          transform="translate(-184, 0)"
          id="slot-overlay"
          data-darkreader-inline-stroke=""
          data-darkreader-inline-fill=""
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
      <div className="absolute z-50 font-bold text-textColor text-xl top-[0px] right-[7px]">
        C
      </div>
    </>
  )
}
export default CoreChampBadgeRow
