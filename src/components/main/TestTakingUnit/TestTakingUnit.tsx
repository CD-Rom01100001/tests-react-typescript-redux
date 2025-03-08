import { FC } from 'react';
import css from './testTakingUnit.module.css'
import { Link } from 'react-router-dom';
import Indicator from './Indicator';

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
        <Indicator number={1} />
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
      <div className={css.testTakingBlock}>
        <p className={css.question}></p>
        <ul className={css.answersList}>
          <li className={css.answer}></li>
          <li className={css.answer}></li>
          <li className={css.answer}></li>
        </ul>
      </div>

    </div>
  );
}

export default PassingBlock;