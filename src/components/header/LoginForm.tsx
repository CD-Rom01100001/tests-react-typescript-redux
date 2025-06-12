import { FC, useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from "axios";
import { useAppDispatch } from '../../store/hooks';
import { loginWindow } from '../../store/slices';

import css from './registrationForm.module.css'

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {

  const formDataShema = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState<LoginFormData>(formDataShema)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name
    const value = event.target.value
    const newObj = {...formData, [key]: value}
    setFormData(newObj)
  }

  const dispatch = useAppDispatch()
  const exit = () => {
    dispatch(loginWindow('close'))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData)
      alert('Вход выполнен')
      localStorage.setItem("token", response.data.token); // Сохраняем токен
      console.log("Пользователь:", response.data.user);
      setFormData(formDataShema)// очищает форму
      exit()
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      alert(err.response?.data?.error || "Ошибка входа");
    }
  };

  return (
    <div className={css.wrap}>
      <div className={css.registrationForm}>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.signIn}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              required
              onChange={handleChange}/>
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              required
              onChange={handleChange}/>

            <div className={css.buttonBlock}>
              <button className={`${css.btnSubmit} ${css.btn}`} type="submit">Войти</button>
              <div className={`${css.btnExit} ${css.btn}`} onClick={exit}></div>
            </div>

          </div>
          
        </form>
      </div>
    </div>
  );
}

export default LoginForm;

// https://chatgpt.com/c/6849e5e7-75f0-800e-908d-13630e5b0f0f#:~:text=Backend%20(Express%20%2B%20MongoDB%20%2B%20JWT)