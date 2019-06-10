import React, { Component } from 'react';

import Routing from '../../components/Routing';
import MainLayout from '../MainLayout';

export default class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <MainLayout>
      <Routing/>
    </MainLayout>;
  }
}
