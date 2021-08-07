export interface todoState {
    modalVisibale: boolean;
}

export enum pageEnumAction {
    OPEN_MODEL = 'OPEN_MODEL',
    CLOSE_MODEL = 'CLOSE_MODEL',
}

export type TOpenModel = {
    type: pageEnumAction.OPEN_MODEL;
};

export type TCloseModel = {
    type: pageEnumAction.CLOSE_MODEL;
};

export type TRageAction = TOpenModel | TCloseModel;
