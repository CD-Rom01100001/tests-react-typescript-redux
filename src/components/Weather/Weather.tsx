import { FC } from 'react';
import css from './weather.module.css'

const Weather: FC = () => {

  const weather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?
q=%D0%9F%D0%B5%D0%BD%D0%B7%D0%B0&
lang=ru&
appid=08f2a575dda978b9c539199e54df03b0&
units=metric`
  }

  return (
    <div className={css.weather}>
      {}
    </div>
  );
}

export default Weather;