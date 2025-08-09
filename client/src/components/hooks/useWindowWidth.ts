import { useEffect, useState } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    // Функция для обновления состояния
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    // Подписываемся на событие изменения размера окна
    window.addEventListener('resize', handleResize)

    // Чистим подписку при размонтировании
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [])

  return width
}