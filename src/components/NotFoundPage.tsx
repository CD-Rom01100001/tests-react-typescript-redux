import { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {

  return (
    <div className='notFoundPage'>
      <span>Страница не найдена!. Go</span> <Link to="/">Home</Link>
    </div>
  );
}

export default NotFoundPage;