import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../header/Header';
import Navigation from '../../nav/Navigation';
import Footer from '../../footer/Footer';
import css from './layoutPC.module.css'

const LayoutPC: FC = () => {

  return (
    <div className={css.layoutPC}>
      <Header/>
      <Navigation/>

      <main className={css.mainPC}>
        <Outlet/>
      </main>

      <Footer/>
    </div>
  );
}

export default LayoutPC;
