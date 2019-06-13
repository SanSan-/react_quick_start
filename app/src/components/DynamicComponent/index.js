import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';

class DynamicComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div id='simple_layout'>
      DynamicComponent
      <Button>Search</Button>
    </div>;
  }
}

DynamicComponent.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  something: PropTypes.object
};

export default connect()(DynamicComponent);
