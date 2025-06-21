import { FC } from 'react';
import css from './historyExam.module.css'

interface HistoryExamProps {
  data: string[]
}

const HistoryExam: FC<HistoryExamProps> = ({data}) => {

  return (
    <div className={css.historyExam}>
      <ul>
        {data.map((result, i) => {
          return (
            <li key={i}>{result}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default HistoryExam;