import React from 'react';
import { ConnectedComponent, DispatchProp, GetProps, Shared } from 'react-redux';
import { AnyAction } from 'redux';

export class Route <P> {
    readonly path: string;
    readonly component: ConnectedComponent<React.FunctionComponent<P>,
        Omit<GetProps<React.FunctionComponent<P>>,
            keyof Shared<DispatchProp<AnyAction>,
                GetProps<React.FunctionComponent<P>>>> & {}>;

    constructor (
      path: string,
      component: ConnectedComponent<React.FunctionComponent<P>,
            Omit<GetProps<React.FunctionComponent<P>>,
                keyof Shared<DispatchProp<AnyAction>,
                    GetProps<React.FunctionComponent<P>>>> & {}>
    ) {
      this.path = path;
      this.component = component;
    }
}
