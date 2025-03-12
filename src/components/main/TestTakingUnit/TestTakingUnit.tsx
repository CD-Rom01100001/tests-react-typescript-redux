import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Indicator from './Indicator';
import { AllQAT } from '../../allStageLink';
import css from './testTakingUnit.module.css'

interface TestTakingUnitProps {
  title: number;
  numberOfQuestions: AllQAT[];
  sectionNum: number
}

const TestTakingUnit: FC<TestTakingUnitProps> = ({title, numberOfQuestions, sectionNum}) => {

  console.log(numberOfQuestions);

  return (
    <div className={css.testTakingUnit}>
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
        {numberOfQuestions.map((indicator, i) => {
          return <Indicator key={i} numName={i+1} numLink={i+1} sectionNum={sectionNum}/>
        })}
      </div>

      {/* блок показателей и описание теста */}
      <div className={css.blockInformation}>
        <div className={css.blockCurrentQest}>
          <p className={css.currentQuest}></p>
        </div>
        <div className={css.questionSummary}>
          <h3 className={css.stageTitle}>{`${title}-й этап`}</h3>
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

export default TestTakingUnit;