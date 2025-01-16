import { FC } from 'react';
import css from './bodyTests.module.css'
import WorkSpace from './Workspace/WorkSpace';
import Tabs from './Tabs/Tabs';

const BodyTests: FC = () => {

  return (
    <div className={css.bodyTests}>
      <Tabs />
      <WorkSpace />
    </div>
  );
}

export default BodyTests;