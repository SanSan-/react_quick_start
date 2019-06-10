import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DynamicComponent = React.lazy(() => import('../DynamicComponent'));

class Layout extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div id='simple_layout'>
            Layout
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent />
      </Suspense>
    </div>;
  }
}

Layout.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  something: PropTypes.object
};

export default connect()(Layout);
