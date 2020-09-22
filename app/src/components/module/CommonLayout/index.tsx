import React, { ReactElement } from 'react';
import { AppContext } from '~types/context';
import CommonType from '~enums/Common';
import { connect } from 'react-redux';
import { GeneralState } from '~types/store';
import Dialog from '~components/common/Dialog';
import Spinner from '~components/common/Spinner';
import SpinnerEnum from '~enums/Spinner';
import AuthProvider from '~components/providers/Auth';
import Auth from '~components/common/Auth';
import bg from '~app/resources/bg.png';

interface Props {
  children?: Array<ReactElement> | ReactElement;
  background?: boolean;
}

const defaultValue: AppContext = {
  __appModal: CommonType.MODAL,
  __appModals: CommonType.MODALS,
  __appToolbarLeft: CommonType.TOOLBAR_LEFT,
  __appToolbarRight: CommonType.TOOLBAR_RIGHT,
  __appToolbarSystem: CommonType.TOOLBAR_SYSTEM,
  __appToolbarTitle: CommonType.TOOLBAR_TITLE
};

export const CommonContext = React.createContext(defaultValue);

const CommonLayout: React.FC<Props> = ({ background, children }: Props): ReactElement =>
  <div style={{ background: `url(${background ? bg : null})` }} id='main_layout'>
    <Dialog/>
    <AuthProvider>
      <Auth>
        {React.Children.only(children)}
      </Auth>
    </AuthProvider>
    <Spinner id={SpinnerEnum.ID as string}/>
  </div>;

export default connect((state: GeneralState) => ({
  background: state.app.common.background
}))(CommonLayout);
