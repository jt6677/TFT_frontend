import { CardWithHeaderFooter } from '~/component/lib'
import { HexProps } from '~/component/editor/types'

const HexHoverable = ({ hex }: { hex: HexProps }) => {
  const header = <div className="m-2">{hex.name}</div>

  return (
    <div className="w-[18rem] text-textColor ">
      <CardWithHeaderFooter header={header}>
        {hex.description}
      </CardWithHeaderFooter>
    </div>
  )
}
export default HexHoverable
