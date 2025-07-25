import { createRoot } from 'react-dom/client'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import './styles/index.css'
import './styles/fonsts.css'
import './styles/normalize.css'
import App from './components/App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
