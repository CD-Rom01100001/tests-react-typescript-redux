import { FC } from 'react';
import contentDescr from '../../../data/descriptions.json'
import Description from '../Description';
import css from './training.module.css'

const Training: FC = () => {

  return (
    <div className={css.training}>
      <Description 
      title={contentDescr.training.title} 
      description={contentDescr.training.description}/>
    </div>
  );
}

export default Training;