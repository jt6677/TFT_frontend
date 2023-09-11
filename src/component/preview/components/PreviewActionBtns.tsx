import { useNavigate } from 'react-router-dom'
import { ImpulseSpinner } from 'react-spinners-kit'

import { Button } from '~/component/lib'

const PreviewActionBtns = ({
  handlePublish,
  handleSave,
  isLoading,
}: {
  handlePublish: () => void
  handleSave: () => void
  isLoading: boolean
}) => {
  const navigate = useNavigate()
  return (
    <div className="h-14">
      {isLoading ? (
        <div className="pt-8 pr-10 ">
          <ImpulseSpinner
            size={30}
            frontColor="rgb(250 204 21)"
            backColor="#fff"
          />
        </div>
      ) : (
        <div>
          <Button type="secondary" onClick={() => navigate('/editor')}>
            继续编辑
          </Button>
          <Button
            type="warning"
            disabled={isLoading}
            additionalCSS="ml-4 font-semibold"
            onClick={handleSave}>
            保存
          </Button>
          <Button
            type="primary"
            disabled={isLoading}
            additionalCSS="ml-4"
            onClick={handlePublish}>
            <span className="p-1 font-bold">&nbsp;&nbsp;发布&nbsp;&nbsp;</span>
          </Button>
        </div>
      )}
    </div>
  )
}
export default PreviewActionBtns
