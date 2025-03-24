import { FC, useState } from 'react';
import Indicator from './Indicator';
import { Link } from 'react-router-dom';
import { AllQAT } from '../../allStageLink';
import css from './testTakingUnit.module.css'
import QuestAndAnswers from './QuestAndAnswers';
interface TestTakingUnitProps {
  title: number;
  numberOfQuestions: AllQAT[];
  sectionAndNum: [string, number][]
}

const TestTakingUnit: FC<TestTakingUnitProps> = ({title, numberOfQuestions, sectionAndNum}) => {

  const [questId, setQuestId] = useState(0)

  const getButtonName = (event: {target: {name: string}}) => {
    setQuestId(Number(event.target.name)-1)
  };
  
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
          setQuestId(0)
          }}>выход</Link>
      </div>

      {/* блок с индикаторами */}
      <Indicator listQuestions={numberOfQuestions} doAfterClick={getButtonName}/>

      {/* блок показателей и описание теста */}
      <div className={css.blockInformation}>
        <div className={css.blockCurrentQest}>
          <p className={css.currentQuest}>{`${questId+1}/${sectionAndNum[0][1]}`}</p>
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
      <QuestAndAnswers QA={numberOfQuestions[questId]}/>

    </div>
  );
}

export default TestTakingUnit;