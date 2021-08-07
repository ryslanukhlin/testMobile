import { StateModel } from '../../model/stateModel';
import {
    TCreateList,
    TDeleteList,
    TodoEnumAction,
    todoState,
    TRegisterAction,
    TSetTodo,
} from '../../types/todoReducer';

const defaultState: todoState = {
    state: [],
};

export const todoReducer = (state = defaultState, action: TRegisterAction): todoState => {
    switch (action.type) {
        case TodoEnumAction.SET_TODOS:
            return { state: action.payload };
        case TodoEnumAction.CREATE_LIST:
            return { state: [...state.state, action.payload] };
        case TodoEnumAction.DELETE_LIST:
            return { state: state.state.filter((list) => list.id !== action.payload) };
        default:
            return state;
    }
};

export const setTodos = (payload: StateModel[]): TSetTodo => ({
    type: TodoEnumAction.SET_TODOS,
    payload,
});

export const createList = (payload: StateModel): TCreateList => ({
    type: TodoEnumAction.CREATE_LIST,
    payload,
});

export const deleteList = (payload: number): TDeleteList => ({
    type: TodoEnumAction.DELETE_LIST,
    payload,
});
