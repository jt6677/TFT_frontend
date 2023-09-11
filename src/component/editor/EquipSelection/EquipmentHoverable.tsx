import { basicEquipment } from '~/assets/stats'
import { CardWithHeaderFooter } from '~/component/lib'
import { EquipmentProps } from '~/component/editor/types'

const EquipmentHoverable = ({ equipment }: { equipment: EquipmentProps }) => {
  const { name, effect, imagePath, formula } = equipment
  const Ids = formula.split(',')

  const reducer = (prev: EquipmentProps[], current: EquipmentProps) => {
    Ids.forEach((Id) => {
      if (current.equipId === Id) {
        prev.push(current)
      }
    })
    return prev
  }

  const basicEquipmentList = basicEquipment.reduce(
    reducer,
    [] as EquipmentProps[]
  )

  const header = `${name}`
  const footer = basicEquipmentList.length ? (
    <div className="grid grid-flow-col place-content-center ">
      合成
      {basicEquipmentList.map((item, index) => (
        <img
          src={item.imagePath}
          alt={item.name}
          key={`${item.equipId}-${index}`}
          className="w-10 h-10 ml-1 border border-orangeColor"
        />
      ))}
    </div>
  ) : null

  return (
    <div className="w-[20rem] text-white">
      <CardWithHeaderFooter header={header} footer={footer}>
        <div className="p-2 m-1 ">{effect}</div>
      </CardWithHeaderFooter>
    </div>
  )
}
export default EquipmentHoverable
