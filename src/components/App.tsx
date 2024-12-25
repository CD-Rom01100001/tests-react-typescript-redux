import { FC } from 'react'
import css from './app.module.css'
import Label from './Label/Label'

const App: FC = () => {

  return (
    <div className={css.app}>
      <Label/>
      <div className={css.app__block_title}>
        <h1 className={css.titleH1}>Обучение сотрудников ФГУП ГЦСС:</h1>
      </div>
      
    </div>
  )
}

export default App
