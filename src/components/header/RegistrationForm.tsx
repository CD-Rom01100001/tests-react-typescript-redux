import { FC, useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import css from './registrationForm.module.css'
import { useAppDispatch } from '../../store/hooks';
import { registrationWindow } from '../../store/slices';
import { getUserDate } from "../../store/userSlice";

type UserDataType = Partial<{
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  resultsTrainingData?: {
    bestResult: string[];
    lastResult: string[];
    openPreview: number[];
  };
  resultsExamData?: string[];
}>

// type RegisterErrorResponse = {
//   error: string;
//   details?: {
//     code?: number;
//     errmsg?: string;
//   };
// };

const RegistrationForm: FC = () => {

  const dispatch = useAppDispatch()
  const exit = () => {
    dispatch(registrationWindow('close'))
  }

  const userData: UserDataType = {
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(userData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name
    const value = event.target.value
    const newObj = {...formData, [key]: value}
    setFormData(newObj)
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      localStorage.setItem("resultsExamData", JSON.stringify(response.data.user.resultsExamData))
      localStorage.setItem("resultsTrainingData", JSON.stringify(response.data.user.resultsTrainingData))
      dispatch(getUserDate(response.data.user))// 
      alert('Регистрация пользователя прошла успешно!')
      setFormData(userData)// очищает форму
      exit()
    } catch (error) {
      // const err = error as AxiosError<RegisterErrorResponse>
      const err = error as AxiosError<{ error: string }>;
      if(err.response?.status === 409) {
        alert('Пользователь с таким email уже существует');
      } else {
        alert('Ошибка регистрации, попробуйте позже');
      }
      // console.log(err.response?.data)
      // console.error(err)
    }
  };

  const getData = async () => {
    const response = await axios.get('http://localhost:5000/api/users/')
    console.log(response.data.password)
  }

  return (
    <div className={css.wrap}>
      <div className={css.registrationForm}>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.signIn}>
            <input 
              name="firstName" 
              value={formData.firstName} 
              placeholder="Имя" 
              required
              onChange={handleChange} />
            <input 
              name="lastName" 
              value={formData.lastName} 
              placeholder="Фамилия" 
              required
              onChange={handleChange} />
            <input 
              name="middleName" 
              value={formData.middleName} 
              placeholder="Отчество" 
              required
              onChange={handleChange} />
            <input 
              name="email" 
              value={formData.email} 
              placeholder="Email" 
              type="email" 
              required
              onChange={handleChange} />
            <input 
              name="password" 
              value={formData.password} 
              placeholder="Пароль" 
              type="password" 
              required
              onChange={handleChange} />

            <div className={css.buttonBlock}>
              <button className={`${css.btnSubmit} ${css.btn}`} type="submit">Зарегистрироваться</button>
              <div className={`${css.btnExit} ${css.btn}`} onClick={exit}></div>
            </div>

          </div>
          
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
