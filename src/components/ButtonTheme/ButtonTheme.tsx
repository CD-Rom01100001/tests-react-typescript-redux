// import {useSelector, useDispatch} from "react-redux";
import { FC } from 'react';
import './buttonTheme.css'
// import {changeTheme} from "../../store/themeSlice.tsx";

type ButtonThemeProps = {
  theme: string;
  active: () => void;
}

const ButtonTheme: FC<ButtonThemeProps> = ({theme, active}) => {
  return (
    <div className={'block-theme'}>
      <button 
      className={`block-theme__button block-theme__button_${theme.toLowerCase()}`}
      onClick={active}>{theme}</button>
    </div>
  );
}

export default ButtonTheme;