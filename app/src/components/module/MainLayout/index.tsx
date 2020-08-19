import React, { ReactElement } from 'react';

interface Props {
  children?: Array<ReactElement> | ReactElement;
}

const MainLayout: React.FC<Props> = ({ children }: Props): ReactElement => <div id='main_layout'>
  {children}
</div>;

export default MainLayout;
