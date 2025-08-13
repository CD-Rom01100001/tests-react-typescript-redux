import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import css from './LayoutMobile.module.css'

const LayoutMobile: FC = () => {

  return (
    <div className={css.layoutMobile}>
      <main className={css.mainMobile}>
        <Outlet/>
      </main>
    </div>
  );
}

export default LayoutMobile;