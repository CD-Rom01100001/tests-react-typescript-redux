import { FC, useState } from 'react';
import Indicator from './Indicator';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { AllQAT } from '../../allStageLink';
// import { getAllStageLink } from '../../allStageLink';
// import { getSectionAndNumber } from '../../sectionAndNumber';
import css from './testTakingUnit.module.css'


interface TestTakingUnitProps {
  title: number;
  numberOfQuestions: AllQAT[];
  sectionNum: number;
  sectionAndNum: [string, number][]
}

const TestTakingUnit: FC<TestTakingUnitProps> = ({title, numberOfQuestions, sectionNum, sectionAndNum}) => {

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
        {numberOfQuestions.map((_, i) => {
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
            {sectionAndNum.map((elem, i) => {
              return <li className={css.section} key={i}>{`${elem[0]} - ${elem[1]}`}</li>
            })}
          </ul>
        </div>
        <div className={css.blockTime}>
          <p></p>
        </div>
      </div>

      {/* блок прохождения тестов */}
      <Outlet/>

    </div>
  );
}

export default TestTakingUnit;