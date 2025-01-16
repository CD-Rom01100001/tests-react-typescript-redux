import { FC } from 'react';
import QuestionsList from './QuestionsList/QuestionsList';
import OrderDownload from './OrderDownload/OrderDownload';
import questions from '../../../../../data/allQuestions.json';
import css from './questionsBlock.module.css'

const QuestionsBlock: FC = () => {

  const sectionList: string[] = [];
  const questionsData = (): void => {

    type AnswersType = {
      section: string;
      value: string;
      correct: boolean;
      id: string;
    }

    type SectionType = {
      question: string;
      answers: AnswersType[]
    }

    type QuesitonsType = {
      legalTraining80: SectionType[];
      tacticalSpecialtyTraining10: SectionType[];
      firstAid50: SectionType[];
      useOfSpecialTools20: SectionType[];
      firearmsTraining84: SectionType[];
    }
    
    for(const key in questions) {
      console.log(questions[key as keyof QuesitonsType][0].answers[0].section);
      sectionList.push(questions[key as keyof QuesitonsType][0].answers[0].section)
    }

  }
  questionsData()

  return (
    <div className={css.questionsBlock}>
      {sectionList.map((elem: string, i: number) => 
        <QuestionsList sectionName={elem} key={i}/>
      )}
      <OrderDownload/>
    </div>
  );
}

export default QuestionsBlock;