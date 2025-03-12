import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Indicator from './Indicator';
import css from './testTakingUnit.module.css'

interface PassingBlockProps {
  title: string
}

const PassingBlock: FC<PassingBlockProps> = ({title}) => {

  return (
    <div className={css.passingBlock}>
      {/* заголовок */}
      <div className={css.blockTitle}>
        <h2 className={css.mainTitle}>Обучение</h2>
      </div>

      {/* кнопка выхода */}
      <div className={css.blockBtnExit}>
        <Link to='/training' className={css.btnExit}>выход</Link>
      </div>

      {/* блок с индикаторами */}
      <div className={css.blockIndicators}>
        <Indicator numName={1} numLink={1} />
      </div>

      {/* блок показателей и описание теста */}
      <div className={css.blockInformation}>
        <div className={css.blockCurrentQest}>
          <p className={css.currentQuest}></p>
        </div>
        <div className={css.questionSummary}>
          <h3 className={css.stageTitle}>{title}</h3>
          <p>из раздела:</p>
          <ul className={css.sectionList}>
            <li className={css.section}></li>
          </ul>
        </div>
        <div className={css.blockTime}></div>
      </div>

      {/* блок прохождения тестов */}
      <Outlet/>

    </div>
  );
}

export default PassingBlock;