import { FC } from 'react';
import css from './registrationForm.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openEntryWindow } from '../../store/slices';

const RegistrationForm: FC = () => {

  const registeredOrNot = useAppSelector(state => state.registeredOrNotIndex.registration)
  const dispatch = useAppDispatch()
  console.log(registeredOrNot)

  const exit = () => {
    dispatch(openEntryWindow(false))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const user = {
      lastName: formData.get('lastName') as string,
      firstName: formData.get('firstName') as string,
      middleName: formData.get('middleName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log(data);
      alert('Регистрация прошла успешно');
      form.reset();
      exit()
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка при регистрации');
    }
  };

  return (
    <div className={css.wrap}>
      <div className={css.registrationForm}>
        <form className={css.form} onSubmit={handleSubmit}>
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
            <div className={`${css.btnExit} ${css.btn}`} onClick={exit}></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;