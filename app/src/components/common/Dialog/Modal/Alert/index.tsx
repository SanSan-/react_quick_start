import React, { ReactElement } from 'react';
import Error, { Props } from '~components/common/Dialog/Modal/Error';

const Alert: React.FC<Props> = (props: Props): ReactElement => (<Error {...props} />);

export default Alert;
