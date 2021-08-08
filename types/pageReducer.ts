import { Todo } from './todoReducer';

export interface todoState {
    modalVisibale: boolean;
    todoTextInput: string;
    valueRaduo?: number;
    editTodo: Todo | null;
}

export enum pageEnumAction {
    OPEN_MODEL = 'OPEN_MODEL',
    CLOSE_MODEL = 'CLOSE_MODEL',
    CHANGE_TODO_TEXT_INPUT = 'CHANGE_TODO_TEXT_INPUT',
    CHANGE_VALUE_RADIO = 'CHANGE_VALUE_RADIO',
    SET_EDIT_TODO = 'SET_EDIT_TODO',
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

export type TSetEditTodo = {
    type: pageEnumAction.SET_EDIT_TODO;
    payload: Todo | null;
};

export type TRageAction =
    | TOpenModel
    | TCloseModel
    | TChangeTodoTextInput
    | TChangeValueRadio
    | TSetEditTodo;
