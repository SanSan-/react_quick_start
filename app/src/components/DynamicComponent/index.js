import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from 'antd';

class DynamicComponent extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div id='simple_layout'>
      DynamicComponent
      <Button onClick={() => {
        this.props.push('roster');
      }}>Search</Button>
    </div>;
  }
}

DynamicComponent.propTypes = {
  push: PropTypes.func
};

export default connect(null, { push })(DynamicComponent);
