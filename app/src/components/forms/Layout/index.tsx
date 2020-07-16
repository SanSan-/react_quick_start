import React, { ReactElement, Suspense } from 'react';
import { connect } from 'react-redux';

const DynamicComponent = React.lazy(() => import('../DynamicComponent'));

const Layout: React.FC = (): ReactElement => <div id='simple_layout'>
  Layout
  <Suspense fallback={<div>Loading...</div>}>
    <DynamicComponent/>
  </Suspense>
</div>;

export default connect()(Layout);
