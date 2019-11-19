import React, { ReactElement } from 'react';

import Routing from '../Routing';
import MainLayout from '../MainLayout';

const App: React.FC = (): ReactElement => <MainLayout>
  <Routing/>
</MainLayout>;

export default App;
