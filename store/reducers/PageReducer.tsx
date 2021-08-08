import {
    pageEnumAction,
    TChangeTodoTextInput,
    TChangeValueRadio,
    TCloseModel,
    todoState,
    TOpenModel,
    TRageAction,
    TSetEditTodo,
} from '../../types/pageReducer';
import { Todo } from '../../types/todoReducer';

const defaultState: todoState = {
    modalVisibale: false,
    todoTextInput: '',
    editTodo: null,
};

export const pageReducer = (state = defaultState, action: TRageAction): todoState => {
    switch (action.type) {
        case pageEnumAction.OPEN_MODEL:
            return { ...state, modalVisibale: true };
        case pageEnumAction.CLOSE_MODEL:
            return { ...state, modalVisibale: false };
        case pageEnumAction.CHANGE_TODO_TEXT_INPUT:
            return { ...state, todoTextInput: action.payload };
        case pageEnumAction.CHANGE_VALUE_RADIO:
            return { ...state, valueRaduo: action.payload };
        case pageEnumAction.SET_EDIT_TODO:
            return { ...state, editTodo: action.payload };
        default:
            return state;
    }
};

export const openModel = (): TOpenModel => ({
    type: pageEnumAction.OPEN_MODEL,
});

export const closeModel = (): TCloseModel => ({
    type: pageEnumAction.CLOSE_MODEL,
});

export const changeTodoTextInput = (payload: string): TChangeTodoTextInput => ({
    type: pageEnumAction.CHANGE_TODO_TEXT_INPUT,
    payload,
});

export const changeValueRadio = (payload: number): TChangeValueRadio => ({
    type: pageEnumAction.CHANGE_VALUE_RADIO,
    payload,
});

export const setEditTodo = (payload: Todo | null): TSetEditTodo => ({
    type: pageEnumAction.SET_EDIT_TODO,
    payload,
});
