import { FC } from 'react';
import css from './passingBlock.module.css'

interface PassingBlockProps {
  title: string
}

const PassingBlock: FC<PassingBlockProps> = ({title}) => {

  return (
    <div className={css.passingBlock}>
      <h2>{title}</h2>
    </div>
  );
}

export default PassingBlock;