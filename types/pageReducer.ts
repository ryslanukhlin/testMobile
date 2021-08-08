export interface todoState {
    modalVisibale: boolean;
    todoTextInput: string;
    valueRaduo?: number;
}

export enum pageEnumAction {
    OPEN_MODEL = 'OPEN_MODEL',
    CLOSE_MODEL = 'CLOSE_MODEL',
    CHANGE_TODO_TEXT_INPUT = 'CHANGE_TODO_TEXT_INPUT',
    CHANGE_VALUE_RADIO = 'CHANGE_VALUE_RADIO',
}

export type TOpenModel = {
    type: pageEnumAction.OPEN_MODEL;
};

export type TCloseModel = {
    type: pageEnumAction.CLOSE_MODEL;
};

export type TChangeTodoTextInput = {
    type: pageEnumAction.CHANGE_TODO_TEXT_INPUT;
    payload: string;
};

export type TChangeValueRadio = {
    type: pageEnumAction.CHANGE_VALUE_RADIO;
    payload: number;
};

export type TRageAction = TOpenModel | TCloseModel | TChangeTodoTextInput | TChangeValueRadio;
