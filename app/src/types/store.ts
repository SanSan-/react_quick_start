import { RouterState } from 'connected-react-router';

interface ModuleStateType {
    module?: string;
}

export interface GeneralStateType {
    app?: ModuleStateType;
    router: RouterState;
}
