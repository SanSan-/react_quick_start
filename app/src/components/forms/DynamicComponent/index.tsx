import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { CallHistoryMethodAction, push } from 'connected-react-router';
import { LocationState, Path } from 'history';

interface Props {
  push: <S = LocationState>(path: Path, state?: S) => CallHistoryMethodAction<[Path, S?]>;
}

const DynamicComponent: React.FC = (props: Props): ReactElement => <div id='simple_layout'>
  DynamicComponent
  <Button onClick={() => {
    props.push('roster');
  }}>Search</Button>
</div>;

export default connect(null, { push })(DynamicComponent);
