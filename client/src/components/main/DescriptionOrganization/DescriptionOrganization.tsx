import { FC } from 'react';
import { Link } from 'react-router-dom';
import css from './DescriptionOrganization.module.css'

const DescriptionOrganization: FC = () => {

  return (
    <div className={css.descriptionOrganization}>

      <Link to='/' className='btnBackMobile buttonDef'>&lt;</Link>

      <h2 className={css.title}>
        О проекте
      </h2>

      <div className={css.blockHistory}>
        <h3 className={css.historyTitle}>
          Описание проекта:
        </h3>
        <p className={css.historyText}>
          <span className={css.appName}>Учебная академия</span> — это онлайн‑платформа для профессиональной подготовки и проверки знаний сотрудников охраны, инкассаторов и работников юридических лиц с особыми уставными задачами.
        </p>
        <p className={css.historyText}>
          Мы объединяем юридическую теорию и практические навыки, чтобы каждый специалист был готов действовать грамотно, безопасно и в рамках закона.
        </p>

        <h3 className={css.historyTitle}>
          Для кого этот сайт:
        </h3>
        <ul>
          <li>Частные охранники и сотрудники ЧОП</li>
          <li>Инкассаторы</li>
          <li>Работники юридических лиц с особыми уставными задачами</li>
          <li>Лица, работа которых связана с применением оружия и спецсредств</li>
        </ul>

        <h3 className={css.historyTitle}>
          Что вы получите:
        </h3>
        <ul>
          <li>Тесты и тренажёры для проверки знаний законодательства о применении оружия и спецсредств</li>
          <li>Обучающие материалы по внутриобъектовой охране, тактике действий и мерам безопасности</li>
          <li>Инструкции по первой помощи и использованию средств индивидуальной защиты</li>
          <li>Возможность самостоятельно оценить готовность к аттестации или экзамену</li>
        </ul>

        <h3 className={css.historyTitle}>
          Мы помогаем специалистам:
        </h3>
        <ul>
          <li>Работать в рамках закона и избегать ошибок, которые могут привести к ответственности</li>
          <li>Повышать профессиональную компетентность и уверенность в своих действиях</li>
          <li>Быть готовыми к реальным ситуациям, где важна каждая секунда</li>
        </ul>

      </div>
    </div>
  );
}

export default DescriptionOrganization;