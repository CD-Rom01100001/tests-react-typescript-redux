import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/owfont-regular.css'
import './weather.css'

type TState = {
  name: string,
  temp: number,
  icon: string
} 
const createFullDate = (): string => {
  const tranceDate = (date: number): string => 
    date < 10 ? `0${date}` : date.toString()
  const date = new Date();
  const year = date.getFullYear()
  const mounth = tranceDate(date.getMonth())
  const day = tranceDate(date.getDate())
  const fullDate = `${day}.${mounth}.${year}г.` 
  return fullDate
}
const createTime = (): string => {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  return currentTime
}
const URL = `https://api.openweathermap.org/data/2.5/weather?q=пенза&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;

const Weather: FC = () => {  
  const [weather, setWeather] = useState<TState | null>(null)
  const [time, setTime] = useState<string | null>(null)
  const [date, setDate] = useState<string | null>(null)

  useEffect(()=> {
    (async () => {
      try {
        axios.get(URL).then(res => {
          setWeather({
            name: res.data.name,
            temp: Math.ceil(res.data.main.temp),
            icon: res.data.weather[0].id
          })
          setTime(createTime())
          setDate(createFullDate())
        })
      } catch (error) {
        console.log(error);
      }
    }) ()
  }, [])

  
  useEffect(() => {
    setTimeout(()=>{
      axios.get(URL).then(res => {
        setWeather({
          name: res.data.name,
          temp: Math.ceil(res.data.main.temp),
          icon: res.data.weather[0].id
        })
      })
      setTime(createTime)
      setDate(createFullDate)
    }, 1000)
  })

  return (
    <div className='weather'>
      <h3>{weather?.name}</h3>
      <p>{weather?.temp} °C</p>
      {<p className={`weather-icon owf owf-${weather?.icon}`}></p>}
      <div>
        <time>{time}</time>
      </div>
      <div>
        <time>{date}</time>
      </div>
    </div>
  );
}

export default Weather;