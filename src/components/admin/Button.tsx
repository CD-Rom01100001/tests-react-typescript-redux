import { FC, ReactNode } from 'react';
import css from './Button.module.css'

interface ButtonProps {
  iconType: ReactNode;
  title: string;
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({iconType, title, onClick}) => {

  return (
    <button className={`buttonDef ${css.edit} ${css.button}`} title={title} onClick={onClick}>
      {iconType}
    </button>
  );
}

export default Button;