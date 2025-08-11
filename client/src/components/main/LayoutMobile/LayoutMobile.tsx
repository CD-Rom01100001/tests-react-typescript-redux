import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import css from './LayoutMobile.module.css'

const LayoutMobile: FC = () => {

  return (
    <div className={css.layoutMobile}>
      <Outlet/>
    </div>
  );
}

export default LayoutMobile;