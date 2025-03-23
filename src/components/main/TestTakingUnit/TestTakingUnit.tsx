import { FC, useEffect, useRef, useState } from 'react';
import Indicator from './Indicator';
import { Link, Outlet } from 'react-router-dom';
import { AllQAT } from '../../allStageLink';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { getCurrentQuestionId } from '../../../store/slices';
// import { getAllStageLink } from '../../allStageLink';
// import { getSectionAndNumber } from '../../sectionAndNumber';
import css from './testTakingUnit.module.css'
import QuestAndAnswers from './QuestAndAnswers';
interface TestTakingUnitProps {
  title: number;
  numberOfQuestions: AllQAT[];
  sectionNum: number;
  sectionAndNum: [string, number][]
}

const TestTakingUnit: FC<TestTakingUnitProps> = ({title, numberOfQuestions, sectionNum, sectionAndNum}) => {

  const dispatch = useAppDispatch()
  const currentQuestionId = useAppSelector(state => state.currentQuestionIdIndex.currentQuestionIdSlice)
  
  return (
    <div className={css.testTakingUnit}>
      {/* заголовок */}
      <div className={css.blockTitle}>
        <h2 className={css.mainTitle}>Обучение</h2>
      </div>

      {/* кнопка выхода */}
      <div className={css.blockBtnExit}>
        <Link to='/training' 
        className={css.btnExit} 
        onClick={()=>{
          dispatch(getCurrentQuestionId(0))
          }}>выход</Link>
      </div>

      {/* блок с индикаторами */}
      <div className={css.blockIndicators}>
        {numberOfQuestions.map((_, i) => {
          return <Indicator  numName={i+1} key={i}/>
        })}
      </div>

      {/* блок показателей и описание теста */}
      <div className={css.blockInformation}>
        <div className={css.blockCurrentQest}>
          <p className={css.currentQuest}>{`${currentQuestionId+1}/${sectionAndNum[0][1]}`}</p>
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
      <QuestAndAnswers QA={numberOfQuestions[currentQuestionId]}/>
      {/* блок прохождения тестов */}
      {/* <Outlet/> */}

    </div>
  );
}

export default TestTakingUnit;