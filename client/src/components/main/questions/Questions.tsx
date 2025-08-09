import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

import contentDescr from '../../../data/descriptions.json'
import contentQuest from '../../../data/allQuestions.json'
import downloadFile from '../../../assets/txt-files/pp_okhranniki_i_rabotniki_2023_itog.pdf'
import type { QuesitonsType } from '../../../data/types';
import { useWindowWidth } from '../../hooks/useWindowWidth';

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
      {/* {useWindowWidth() < 800 && <Link to='/'>Назад</Link>} */}
      
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

        <div className={css.additionalInfo}>
          <div className={css.ordersBlock}>
            <p className={css.orders}>Все они утверждены</p>
            <a href="https://rosguard.gov.ru/document/article/prikaz-federalnoj-sluzhby-vojsk-nacionalnoj-gvardii-rossijskoj-federacii-ot-25112019--387" className={css.orderLink} target=':black'>Приказом Росгвардии от 25.11.2019 N 387</a>
          </div>
          <div className={css.dawnloadLinkBlock}>
            <a href={downloadFile} className={css.downloadLink} download>Скачать вопросы с ответами</a>
          </div>
        </div>

        <Outlet/>
        
      </div>
    </div>
  );
}

export default Questions;