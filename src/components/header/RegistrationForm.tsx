import { FC } from 'react';
import css from './registrationForm.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openEntryWindow } from '../../store/slices';

const RegistrationForm: FC = () => {

  const registeredOrNot = useAppSelector(state => state.registeredOrNotIndex.registration)
  const dispatch = useAppDispatch()
  console.log(registeredOrNot)

  const exit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(openEntryWindow(false))
  }

  return (
    <div className={css.wrap}>
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
                  required
                />
              </label>

              <label>
                Имя:
                <input 
                  type="text" 
                  name="firstName"
                  required
                />
              </label>

              <label>
                Отчество:
                <input 
                  type="text" 
                  name="middleName"
                  required
                />
              </label>
            </div>
          }

          <label>
            Электроная почта:
            <input 
              type="email" 
              name="email"
              required
            />
          </label>

          <label>
            Пароль:
            <input 
              type="password" 
              name="password"
              required
            />
          </label>
          <div className={css.buttonBlock}>
            <button type="submit" className={`${css.btnSubmit} ${css.btn}`} >
              {registeredOrNot ? 'Зарегистрировться' : 'Войти'}
            </button>
            <button className={css.btn} onClick={(event)=>exit(event)}>
              Выйти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;