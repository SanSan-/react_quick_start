import React, { ReactElement } from 'react';

import Routing from '../Routing';
import BusinessLayout from '../BusinessLayout';
import CommonLayout from '../CommonLayout';

const App: React.FC = (): ReactElement => <CommonLayout>
  <BusinessLayout>
    <Routing/>
  </BusinessLayout>
</CommonLayout>;

export default App;
