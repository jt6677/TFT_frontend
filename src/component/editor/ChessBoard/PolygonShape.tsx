function PolygonShape({ backgroundColor }: { backgroundColor: string }) {
  return (
    <svg width="100%" viewBox="0 0 84 96">
      <defs>
        <clipPath id="boardPolygon">
          <polygon
            points="184 24 226 -3.16413562e-15 268 24 268 72 226 96 184 72"
            transform="translate(-184, 0)"
          />
        </clipPath>
      </defs>

      <path
        stroke="none"
        strokeWidth="4"
        fill={backgroundColor}
        d="M186,25.1606451 L186,70.8393549 L226,93.6964978 L266,70.8393549 L266,25.1606451 L226,2.30350221 L186,25.1606451 Z"
        transform="translate(-184, 0)"
        id="slot-overlay"
      />
    </svg>
  )
}
export default PolygonShape
