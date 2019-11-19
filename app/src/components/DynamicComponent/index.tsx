import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

const DynamicComponent: React.FC = (): ReactElement => <div id='simple_layout'>
  DynamicComponent
  <Button>Search</Button>
</div>;

export default connect()(DynamicComponent);
