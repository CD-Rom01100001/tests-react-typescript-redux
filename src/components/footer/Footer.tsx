import { FC } from 'react';
import css from './footer.module.css'

const Footer: FC = () => {
  const showDate = (): number => {
    const date = new Date();
    return date.getFullYear()
  }

  return (
    <footer className={css.footer}>
      <p className={css.copy}>&copy;{showDate()}</p>
    </footer>
  );
}

export default Footer;