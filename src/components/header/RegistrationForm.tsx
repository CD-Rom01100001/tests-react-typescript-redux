import { FC } from 'react';
import css from './registrationForm.module.css'
import { useAppSelector } from '../../store/hooks';

const RegistrationForm: FC = () => {

  const registeredOrNot = useAppSelector(state => state.registeredOrNotIndex.registration)
  console.log(registeredOrNot)

  return (
    <div className={css.registrationForm}>
      <form className={css.form}>
        <div className={css.blockTitle}>
          <h2 className={css.title}>
            {registeredOrNot ? 'Регистрация' : 'Вход'}
          </h2>
        </div>

        {registeredOrNot &&
          <div className={css.signIn}>
            <label>
              Фамилия:
              <input 
                type="text" 
                name="lastName"
              />
            </label>

            <label>
              Имя:
              <input 
                type="text" 
                name="firstName"
              />
            </label>

            <label>
              Отчество:
              <input 
                type="text" 
                name="middleName"
              />
            </label>
          </div>
        }

        <label>
          Электроная почта:
          <input 
            type="email" 
            name="email"
          />
        </label>

        <label>
          Пароль:
          <input 
            type="password" 
            name="password"
          />
        </label>
        <div className={css.buttonBlock}>
          <button type="submit" className={css.btnSubmit}>
            {registeredOrNot ? 'Зарегистрировться' : 'Войти'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;