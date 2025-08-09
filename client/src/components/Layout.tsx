import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Navigation from './nav/Navigation';
import Footer from './footer/Footer';
import css from './layout.module.css'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC/* <LayoutProps> */ = (/* {children} */) => {

  return (
    <div className={css.layout}>
      <Header/>
      <Navigation/>

      <main className={css.main}>
        <Outlet/>
        {/* {children} */}
      </main>

      <Footer/>
    </div>
  );
}

export default Layout;
