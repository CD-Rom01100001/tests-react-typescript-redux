import { FC, useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from "axios";
import axiosInstance from '../../api/axiosInstance';
import { useAppDispatch } from '../../store/hooks';
import { loginWindow } from '../../store/slices';
import { getUserDate } from '../../store/userSlice';
import { setResultsData } from '../../store/setResultsSlice';

import css from './registrationForm.module.css'

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {

  const dispatch = useAppDispatch()

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

  const exit = () => {
    dispatch(loginWindow('close'))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      /* 'http://localhost:5000/api/users/login' */
      const response = await axiosInstance.post('/api/users/login', formData)
      const { user, token } = response.data
      console.log(response.data.user.id)
      alert('Вход выполнен')
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("resultsExamData", JSON.stringify(response.data.user.resultsExamData))
      localStorage.setItem("resultsTrainingData", JSON.stringify(response.data.user.resultsTrainingData))
      dispatch(setResultsData({
        resultsTrainingData: user.resultsTrainingData,
        resultsExamData: user.resultsExamData
      }));
      console.log("Пользователь:", response.data.user)
      setFormData(formDataShema)// очищает форму
      exit()// закрывается окно входа
      dispatch(getUserDate(response.data.user))
    } catch (error) {
      const err = error as AxiosError<{ error: string }>
      alert(err.response?.data?.error || "Ошибка входа")
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
