import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class MainLayout extends PureComponent {
  render () {
    return <div id='main_layout'>
      {this.props.children}
    </div>;
  }
}

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
