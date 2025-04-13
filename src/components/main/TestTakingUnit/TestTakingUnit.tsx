import { FC, useState, useEffect} from 'react';
import Indicator from './Indicator';
import { Link, useLocation } from 'react-router-dom';
import { AllQAT } from '../../allStageLink';
import css from './testTakingUnit.module.css'
import QuestAndAnswers from './QuestAndAnswers';
import TestTime from './TestTime';
import Alert from './Alert';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import sound from '../../../assets/sounds/end_or_pass.mp3'
import Buttons from './Buttons';
import { getIndicatorId } from '../../../store/slices';
interface TestTakingUnitProps {
  title: string;
  stageNumber?: number;
  numberOfQuestions: AllQAT[];
  sectionAndNum: [string, number][]
}

// /* перемешивает вопросы */
const shuffleQuestionArray = (array: AllQAT[]): AllQAT[] => {
  // const shuffled = [...array]
  for (let i = array.length-1; i > 0; i--) {
    const randomIndex: number = Math.floor(Math.random() * (i+1));// случайный индекс от 0 до i
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]// меняет местами
  }
  return array
}

const TestTakingUnit: FC<TestTakingUnitProps> = ({title, stageNumber, numberOfQuestions, sectionAndNum}) => {
  const dispatch = useAppDispatch()
  const indicatorId = useAppSelector(state => state.indicatorIdIndex.currentIndicatorId)
  const alert = useAppSelector(state => state.alertTrainingIndex.stateAlert)

  const location = useLocation().pathname.match(/^\/training\/stage-\d+$/)// проверка на соответствие шаблона адреса
  const [shuffledQuestions, setShuffledQuestions] = useState<AllQAT[]>([]);
  useEffect(() => {
    const shuffled = shuffleQuestionArray(numberOfQuestions);
    setShuffledQuestions(shuffled);
  }, [numberOfQuestions]);

  /* пра нажатии на кнопку ВЫХОД */
  const stopTest = () => {
    dispatch(getIndicatorId(0))
  }

  /* показывает окно предупреждения */
  const openAlert = (): JSX.Element => {
    new Audio(sound).play()
    return <Alert/>
  }
  
  /* в зависимости от адреса устанавливает разделы */
  const getCurrentSection = () => {
    if (location) {
      return <ul className={css.sectionList}>
        {sectionAndNum.map((elem, i) => {
          return <li className={css.sectionLi} key={i}>{`${elem[0]} - ${elem[1]}`}</li>
        })}
      </ul>
    }
    return <p className={css.section}>{numberOfQuestions[indicatorId].answers[0].section}</p>
  }

  return (
    <div className={css.testTakingUnit}>
      {/* заголовок */}
      <div className={css.blockTitle}>
        <h2 className={css.mainTitle}>{title}</h2>
      </div>

      {/* кнопка выхода */}
      <div className={css.blockBtnExit}>
        <Link 
          to='/training' 
          className={css.btnExit} 
          onClick={stopTest}>Выход</Link>
      </div>

      {/* блок с индикаторами */}
      <Indicator 
        listQuestions={shuffledQuestions}/>

      {/* блок показателей и описание теста */}
      <div className={css.blockInformation}>

        <div className={css.blockCurrentQest}>
          {/* контент будет в зависимости от адреса */}
          <p className={css.currentQuest}>{`${indicatorId+1}/${location ? sectionAndNum[0][1] : numberOfQuestions.length}`}</p>
        </div>

        <div className={css.questionSummary}>
          {/* контент будет в зависимости от адреса */}
          {location &&
            <h3 className={css.stageTitle}>{`${stageNumber}-й этап`}</h3>
          }
          <p>из раздела:</p>
          {getCurrentSection()}
        </div>

        <div className={css.blockTime}>
          <TestTime/>
        </div>
        {/* окно предупреждения */}
        {alert === 'open' ? openAlert() : ''}
      </div>

      {/* блок прохождения тестов */}
      <QuestAndAnswers qA={shuffledQuestions}/>

      {/* навигация с помощью кнопок */}
      <Buttons 
        numberOfQuestions={shuffledQuestions}/>
    </div>
  );
}

export default TestTakingUnit;