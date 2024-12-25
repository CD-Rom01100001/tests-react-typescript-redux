import { FC } from 'react';
import label from '../../assets/images/logo.png';
import css from './label.module.css';

const Label: FC = () => {

  return (
    <div className={css.label}>
      <img src={label} alt="Label" />
    </div>
  );
}

export default Label;