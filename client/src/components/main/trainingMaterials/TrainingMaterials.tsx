import { FC, useMemo } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { TrainingMaterialsData } from '../../../data/trainingMaterials/trainingMaterialsData';
import css from './TrainingMaterials.module.css'

type ActiveType = {
  isActive: boolean
}
const setActive = ({isActive}: ActiveType): string => isActive ? css.active : '';

const TrainingMaterials: FC = () => {

  const pathname = useLocation().pathname;
  const location = useMemo(() => pathname.match(/^\/training-materials\//), [pathname])
  console.log(location)

  return (
    <div className={css.trainingMaterials}>
      
      <div className={css.blockBtnBack}>
        <Link to='/' className='btnBackMobile buttonDef'>&lt;</Link>
      </div>

      <h2 className={css.title}>Учебные материалы</h2>
        
      <div className={css.mainBlock}>
        <nav className={css.blockNavigation}>
        <ul>
          {TrainingMaterialsData.map((section, i) => {
            return (
              <li className={css.li} key={i}>
                <NavLink 
                to={section.path} 
                className={setActive}>
                  {section.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
        </nav>

        <section className={css.sectionPc}>
          {location ? 
          <Outlet/> :
          <h2>Выбирете раздел</h2>}
        </section>
      </div>

    </div>
  );
}

export default TrainingMaterials;