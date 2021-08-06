import { StateModel } from '../../model/stateModel';
import { TodoEnumAction, todoState, TRegisterAction, TSetTodo } from '../../types/todoReducer';

const defaultState: todoState = {
    state: [],
};

export const todoReducer = (state = defaultState, action: TRegisterAction): todoState => {
    switch (action.type) {
        case TodoEnumAction.SET_TODOS:
            return { state: action.payload };
        default:
            return state;
    }
};

export const setTodos = (payload: StateModel[]): TSetTodo => ({
    type: TodoEnumAction.SET_TODOS,
    payload,
});
