import { FC } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { TrainingMaterialsData } from '../../../data/trainingMaterials/trainingMaterialsData';
import css from './TrainingMaterials.module.css'

type ActiveType = {
  isActive: boolean
}
const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';

const TrainingMaterials: FC = () => {

  return (
    <div className={css.trainingMaterials}>
      <nav className={css.blockNavigation}>
        {TrainingMaterialsData.map((section, i) => {
          return (
            <NavLink 
            to={section.path} 
            className={setActive} 
            key={i}>
              {section.title}
            </NavLink>
          )
        })}
      </nav>

      <section>
        <Outlet/>
      </section>

    </div>
  );
}

export default TrainingMaterials;