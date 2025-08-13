import { FC } from 'react';
import css from './IconMenu.module.css'

interface IconMenuProps {
  isActive: boolean;
  onToggle: () => void
}

const IconMenu: FC<IconMenuProps> = ({isActive, onToggle}) => {

  return (
    <div className={`${css.iconMenu} ${isActive ? css.active : ''}`} onClick={onToggle}>
      <div className={css.centerLine}></div>
    </div>
  );
}

export default IconMenu;