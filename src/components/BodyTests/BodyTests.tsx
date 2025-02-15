import { FC } from 'react';
import css from './bodyTests.module.css'
import WorkSpace from './Workspace/WorkSpace';
import NavigationTabs from './Tabs/NavigationTabs';

const BodyTests: FC = () => {

  return (
    <div className={css.bodyTests}>
      <NavigationTabs />
      <WorkSpace />
    </div>
  );
}

export default BodyTests;