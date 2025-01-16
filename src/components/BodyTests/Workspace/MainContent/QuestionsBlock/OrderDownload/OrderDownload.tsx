import { FC } from 'react';
import css from './orderDownload.module.css'

const OrderDownload: FC = () => {

  return (
    <div className={css.orderDownload}>
      <p>Все они утверждены 
        <a href="https://rosguard.gov.ru/document/article/prikaz-federalnoj-sluzhby-vojsk-nacionalnoj-gvardii-rossijskoj-federacii-ot-25112019--387">Приказом Росгвардии от 25.11.2019 N 387</a>
      </p>

      <a href="">Скачать вопросы с ответами</a>
    </div>
  );
}

export default OrderDownload;