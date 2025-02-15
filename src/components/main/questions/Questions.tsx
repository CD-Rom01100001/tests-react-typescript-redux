import { FC } from 'react';
import contentDescr from '../../../data/descriptions.json'
import contentQuest from '../../../data/allQuestions.json'
import type { QuesitonsType } from '../../../data/types';
import css from './questions.module.css'
import Description from '../Description';

const Questions: FC = () => {

  const getTotalQuestions = (): number => {
    let count = 0;
    for(const key in contentQuest) {
      count += contentQuest[key as keyof QuesitonsType].length
    }
    return count
  }

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
        <ul className={css.sectionList}>
          <li className={css.sectionName}></li>
          <li className={css.sectionName}></li>
          <li className={css.sectionName}></li>
          <li className={css.sectionName}></li>
          <li className={css.sectionName}></li>
        </ul>
      </div>

    </div>
  );
}

export default Questions;