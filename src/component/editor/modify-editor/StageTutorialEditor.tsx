import StageTutorialDisplay from '~/component/editor/StageTutorial'
import useModifyStore from '~/component/editor/state/store/modifyStore'

function StageTutorialEditor() {
  const store = useModifyStore((state) => state)

  return (
    <>
      {store.stageTutorial.map((_, i) => (
        <StageTutorialDisplay store={store} tutorialIndex={i} key={i} />
      ))}
    </>
  )
}

export default StageTutorialEditor
