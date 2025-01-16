import { FC } from 'react';
import css from './description.module.css'

type DescriptionProps = {
  data: {
    title: string,
    description: string
  }
}

const Description: FC<DescriptionProps> = ({data}) => {

  return (
    <div className={css.description}>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
    </div>
  );
}

export default Description;