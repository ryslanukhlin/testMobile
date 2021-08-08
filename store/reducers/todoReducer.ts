import { StateModel } from '../../model/stateModel';
import {
    TCreateList,
    TDeleteList,
    TodoEnumAction,
    todoState,
    TRegisterAction,
    TSetTodo,
    TCreatedTodo,
    Todo,
    TDeleteTodo,
    TEditTodo,
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
        case TodoEnumAction.CREATE_TODO:
            return (() => {
                const indexList = state.state.findIndex(
                    (list) => list.id === action.payload.list_id,
                );

                const list = state.state[indexList];

                const updateList = {
                    ...list,
                    todos: [...list.todos!, action.payload],
                };

                return {
                    state: [
                        ...state.state.slice(0, indexList),
                        updateList,
                        ...state.state.slice(indexList + 1),
                    ],
                };
            })();
        case TodoEnumAction.DELETE_TODO:
            return (() => {
                const indexList = state.state.findIndex(
                    (list) => list.id === action.payload.listId,
                );

                const list = state.state[indexList];

                const updateList = {
                    ...list,
                    todos: list.todos?.filter((todo) => todo.id !== action.payload.todoId),
                };

                return {
                    state: [
                        ...state.state.slice(0, indexList),
                        updateList,
                        ...state.state.slice(indexList + 1),
                    ],
                };
            })();
        case TodoEnumAction.EDIT_TODO:
            return (() => {
                const indexList = state.state.findIndex(
                    (list) => list.id === action.payload.todo.list_id,
                );

                const list = state.state[indexList];
                list.todos!.find((todo) => todo.id === action.payload.todo.id)!.text =
                    action.payload.newText;

                const updateList = {
                    ...list,
                };

                return {
                    state: [
                        ...state.state.slice(0, indexList),
                        updateList,
                        ...state.state.slice(indexList + 1),
                    ],
                };
            })();
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

export const createdTodo = (payload: Todo): TCreatedTodo => ({
    type: TodoEnumAction.CREATE_TODO,
    payload,
});

export const deleteTodo = (payload: { listId: number; todoId: number }): TDeleteTodo => ({
    type: TodoEnumAction.DELETE_TODO,
    payload,
});

export const editTodo = (payload: { todo: Todo; newText: string }): TEditTodo => ({
    type: TodoEnumAction.EDIT_TODO,
    payload,
});
