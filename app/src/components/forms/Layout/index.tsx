import React, { ReactElement } from 'react';
import { connect } from 'react-redux';

import DynamicComponent from '../DynamicComponent';

const Layout: React.FC = (): ReactElement => <div id='simple_layout'>
  Layout
  <DynamicComponent/>
</div>;

export default connect()(Layout);
