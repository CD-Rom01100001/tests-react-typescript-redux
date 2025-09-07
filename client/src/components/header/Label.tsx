import css from './label.module.css';
import { FC } from 'react';
import label from '../../assets/images/logo.png';

const Label: FC = () => {

  return (
    <div className={css.label}>
      <img className={css.logo} src={label} alt="Label" />
      <h1 className={css.company_name}>
        <span className={css.legal_status}>
          обучающая плотформа
        </span>
        &laquo;Учебная академия&raquo;
      </h1>
    </div>
  );
}

export default Label;