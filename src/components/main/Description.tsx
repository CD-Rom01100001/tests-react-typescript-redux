import { FC } from 'react';
import css from './description.module.css'

interface DescriptionProps {
  title: string;
  description: string[]
}

const Description: FC<DescriptionProps> = ({title, description}) => {

  return (
    <div className={css.description}>
      <div className={css.blockTitle}>
        <h2 className={css.title}>
          {title}
        </h2>
      </div>

      <div className={css.blockDescription}>
        {description.map((text, key) => 
          <p className={css.description} key={key}>
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

export default Description;