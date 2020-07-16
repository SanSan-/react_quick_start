import React from 'react';
import { ConnectedComponent, DispatchProp, GetProps, Shared } from 'react-redux';

export class Route <P> {
    readonly path: string;
    readonly component: ConnectedComponent<React.FunctionComponent<P>,
        Omit<GetProps<React.FunctionComponent<P>>,
            keyof Shared<DispatchProp, GetProps<React.FunctionComponent<P>>>> & Record<string, unknown>>;

    constructor (
      path: string,
      component: ConnectedComponent<React.FunctionComponent<P>,
            Omit<GetProps<React.FunctionComponent<P>>,
                keyof Shared<DispatchProp, GetProps<React.FunctionComponent<P>>>> & Record<string, unknown>>
    ) {
      this.path = path;
      this.component = component;
    }
}
