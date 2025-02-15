import { FC } from 'react';
import QuestionsList from './QuestionsList/QuestionsList';
import OrderDownload from './OrderDownload/OrderDownload';
import questions from '../../../../../data/allQuestions.json';
import { QuesitonsType } from '../../../../../data/types';
// import SectionQuestions from './SectionsQuestions/SectionQuestions';
// import { Route, Routes, Link } from 'react-router-dom';

import css from './questionsBlock.module.css'

const QuestionsBlock: FC = () => {

  const sectionNames: string[] = [];

  const getSectionNames = (): void => {
    for(const key in questions) {
      sectionNames.push(questions[key as keyof QuesitonsType][0].answers[0].section)
    }
  }
  getSectionNames()

  const getQuestionNumber = (): number => {
    let numQuest = 0;
    for(const key in questions) {
      numQuest += questions[key as keyof QuesitonsType].length
    }
    return numQuest
  }  

  return (
    <div className={css.questionsBlock}>
        <h3>{`Всего ${getQuestionNumber()} вопроса:`}</h3>
        {/* <ul>
          {sectionNames.map((elem: string, i: number) => 
            <QuestionsList 
              sectionName={elem} 
              sectionLink={Object.keys(questions)[i]} key={i} />
          )}
        </ul> */}
      {/* <OrderDownload/> */}

        {/* {Object.keys(questions).map((link: string, i: number) => 
          <Route path={`/${i+1}-${link}`} element={<SectionQuestions i={i+1}/>}/>
        )} */}
      {/* {questions.legalTraining80.map((qa, i) => 
        <div>
          <h4>{`${i+1}. ${qa.question}`}</h4>
          <div>{qa.answers.map(elem=>
            <p>{elem.value}</p>
          )}</div>
        </div>
        
      )} */}
    </div>
  );
}

export default QuestionsBlock;