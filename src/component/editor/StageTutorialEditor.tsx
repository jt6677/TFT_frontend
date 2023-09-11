import StageTutorialDisplay from '~/component/editor/StageTutorial'
import useEditorStore from '~/component/editor/state/store/editorStore'

function StageTutorialEditor() {
  const store = useEditorStore((state) => state)

  return (
    <>
      {store.stageTutorial.map((_, i) => (
        <StageTutorialDisplay store={store} tutorialIndex={i} key={i} />
      ))}
    </>
  )
}

export default StageTutorialEditor
