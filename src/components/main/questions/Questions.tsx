import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import contentDescr from '../../../data/descriptions.json'
import contentQuest from '../../../data/allQuestions.json'
import type { QuesitonsType } from '../../../data/types';

import Description from '../Description';
import QuestionSectionLink from './QuestionSectionLink';
import css from './questions.module.css'


const getTotalQuestions = (): number => {
  let count = 0;
  for(const key in contentQuest) {
    count += contentQuest[key as keyof QuesitonsType].length
  }
  return count
}

const getSectionNameLinkList = (): string[][] => {
  const sectionNameList: string[][] = []
  for(const key in contentQuest) {
    const k = key as keyof QuesitonsType
    sectionNameList.push(`${contentQuest[k][0].answers[0].section}, ${k}`.split(', '))
  }
  return sectionNameList
}


const Questions: FC = () => {
  return (
    <div className={css.questions}>
      <Description 
      title={contentDescr.questions.title} 
      description={contentDescr.questions.description}/>

      <div className={css.blockQuestions}>

        <div className={css.blockTitleQuesitons}>
          <h3 className={css.titleQuestions}>
            {`Всего ${getTotalQuestions()} вопросов:`}
          </h3>
        </div>

        <nav className={css.blockSectionList}>
          <ul className={css.sectionList}>
            {getSectionNameLinkList().map((elem, i) => 
              <QuestionSectionLink name={elem[0]} link={elem[1]} key={i}/>
            )}
          </ul>
        </nav>

        <Outlet/>
        
      </div>
    </div>
  );
}

export default Questions;