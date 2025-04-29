import { FC, useState, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AllQAT } from '../../allStageLink';
import sound from '../../../assets/sounds/end_or_pass.mp3'

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getIndicatorId, clearAnswers, defineEndTest, setStateAlert, setPath } from '../../../store/slices';

import QuestAndAnswers from './QuestAndAnswers';
import TestTime from './TestTime';
import Indicator from './Indicator';
import Buttons from './Buttons';
import Alert from '../../Alert';

import css from './testTakingUnit.module.css'

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
  const defineEndTestSlice = useAppSelector(state => state.defineEndTestIndex.defineEnd)
  const alert = useAppSelector(state => state.alertTrainingIndex.stateAlert)
  const path = useAppSelector(state => state.alertTrainingIndex.path)

  const location = useLocation().pathname.match(/^\/training\/stage-\d+$/)// проверка на соответствие шаблона адреса
  const [shuffledQuestions, setShuffledQuestions] = useState<AllQAT[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Предварительно нициализируем звук
    audioRef.current = new Audio(sound)
    audioRef.current.preload = 'auto'

    const shuffled = shuffleQuestionArray(numberOfQuestions);
    setShuffledQuestions(shuffled);
  }, [numberOfQuestions]);


  /* пра нажатии на кнопку ВЫХОД */
  const exitTest = () => {
    dispatch(getIndicatorId(0))
    dispatch(clearAnswers())// очищает объект с ответами
    dispatch(defineEndTest(false))
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

  const openExitAlert = (): JSX.Element => {
    audioRef.current?.play()
    return <Alert/>
  }

  /* что-бы будучи не на главной странице, при перезагрузке страницы текущий путь сохранялся. Иначе при нажатии на кнопку "Выход" и при нажатии на кнопку "да/выход" в модальном окне, путь будет вести на главную страницу поскольку путь в "slices - path: '/'" будет сбрасываться на дефолтный, т.е. '/' */
  useEffect(() => {
    const path = window.location.pathname; // сохраняем текущий путь
    dispatch(setPath(`/${path.split('/')[1]}`));
  }, [dispatch])

  return (
    <div className={css.testTakingUnit}>
      {alert === 'open' ? openExitAlert() : ''}
      {/* заголовок */}
      <div className={css.blockTitle}>
        <h2 className={css.mainTitle}>{title}</h2>
      </div>

      {/* кнопка выхода */}
      <div className={css.blockBtnExit}>
        {/* если тест не завершон, то обычная кнопка, иначе ссылка */}
        {defineEndTestSlice ? 
          <Link 
            onClick={exitTest}
            to={path}
            className={css.btnExit}>Выход</Link> :
          <button 
            onClick={()=>dispatch(setStateAlert('open'))}
            className={css.btnExit}>Выход</button>
        }

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