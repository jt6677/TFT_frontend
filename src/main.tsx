import '~/index.css'

import { render } from 'react-dom'

// import { GetRawData } from '~/component/mis/statsProcessing'
import AppProviders from '~/context'
import { App } from '~/routes'

const Main = () => {
  return (
    <AppProviders>
      <App />
    </AppProviders>
  )
}
// GetRawData().then((data) => console.log('ss', data))

const rootElement = document.getElementById('root')
render(<Main />, rootElement)
