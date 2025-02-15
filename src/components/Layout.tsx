import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Navigation from './nav/Navigation';
import Footer from './footer/Footer';
import css from './layout.module.css'

const Layout: FC = () => {

  return (
    <div className={css.layout}>
      <Header/>
      <Navigation/>

      <main className={css.main}>
        <Outlet/>
      </main>

      <Footer/>
    </div>
  );
}

export default Layout;
