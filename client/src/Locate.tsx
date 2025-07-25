import { FC } from 'react';

const Demo: FC = () => {

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude); // выводит координаты местоположения пользователя
      }, function(error) {
        console.log(error.message); // выводит сообщение об ошибке
      });

  return (
    <div className='demo'>
      
    </div>
  );
}

export default Demo;