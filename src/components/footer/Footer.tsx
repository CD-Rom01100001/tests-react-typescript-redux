import { FC } from 'react';
import css from './footer.module.css'

const Footer: FC = () => {
  const showDate = (): number => {
    const date = new Date();
    return date.getFullYear()
  }

  return (
    <footer className={css.footer}>
      <span>&copy;{showDate()}</span>
    </footer>
  );
}

export default Footer;