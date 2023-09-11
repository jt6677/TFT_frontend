import classNames from 'classnames'
import { useState } from 'react'

const HeartBtn = ({
  isLiked,
  onClick,
  likeCount,
}: {
  isLiked: boolean
  onClick: (action: 'add' | 'remove') => void
  likeCount: number
}) => {
  // const [isClicked, setIsClicked] = useState(false)
  // const likeNum = 321
  const handleClick = () => {
    if (isLiked) {
      onClick('remove')
    } else {
      onClick('add')
    }
  }
  return (
    <>
      <button
        className={classNames('btn-deluxe-switchable ', {
          active: isLiked,
        })}
        onClick={handleClick}>
        <span className="btn-deluxe-edge" />
        <span className="flex btn-deluxe-front">
          <div className={classNames('heart flex', { active: isLiked })}>
            <div className="heart-flip " />
            <span className="ml-2 ">{likeCount}</span>
          </div>
        </span>
      </button>
      {/* <div
        onClick={() => setIsClicked(!isClicked)}
        className={classNames('heart', { active: isClicked })}>
        <div className="heart-flip " />
      </div> */}

      {/* <button
        onClick={() => setIsClicked(!isClicked)}
        className={classNames('heart-button', { active: isClicked })}>
        <div className="heart-flip" />
        <span>{likeNum}</span>
      
      </button> */}
    </>
  )
}
export default HeartBtn
