import { FC } from 'react';
import { Link } from 'react-router-dom';
import type { WeaponsT } from '../../../data/trainingMaterials/weapoons';
import type { RubberSticksT } from '../../../data/trainingMaterials/rubberSticks';
import css from './MaterialDescription.module.css'

interface MaterialDescriptionProp {
  title: string,
  data: WeaponsT[] | RubberSticksT[]
}

const MaterialDescription: FC<MaterialDescriptionProp> = ({title, data}) => {

  return (
    <div className={css.materialDescription}>
      <Link to='/training-materials' className='btnBackMobile buttonDef'>&lt;</Link>
      
      <div className={css.blockTitle}>
        <h2 className={css.title}>{title}</h2>
      </div>
      <div className={css.descriptionBlock}>
        {data.map((weapoons, i) => {
          return (
            <div className={css.weapoonsCard} key={i}>
              <div className={css.blockTitle}>
                <h3 className={css.weapoonName}>{weapoons.name}</h3>
              </div>
              <div className={css.blockImage}>
                <img src={weapoons.image} alt="оружее" className={css.image} />
              </div>
              {
                typeof weapoons.description === 'string' ?
                <p>{weapoons.description}</p> :
                <ul>
                  {Object.entries(weapoons.description).map(([key, value], i) => {
                    return (
                      <li key={i}>
                        <span>{key}</span> : <span>{value}</span>
                      </li>
                    )
                  })}
                </ul>
              }
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default MaterialDescription;