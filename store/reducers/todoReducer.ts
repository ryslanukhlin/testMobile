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
    TComplitedTodo,
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
                const copyState = state.state.map((category) => {
                    if (category.id === action.payload.list_id)
                        category.todos?.push(action.payload);
                    return category;
                });

                return {
                    state: copyState,
                };
            })();
        case TodoEnumAction.DELETE_TODO:
            return (() => {
                const copyState = state.state.map((category) => {
                    if (category.id === action.payload.listId) {
                        const todos = category.todos?.filter(
                            (todo) => todo.id !== action.payload.todoId,
                        );
                        category.todos = todos;
                    }
                    return category;
                });

                return {
                    state: copyState,
                };
            })();
        case TodoEnumAction.EDIT_TODO:
            return (() => {
                const copyState = state.state.map((category) => {
                    if (category.id === action.payload.todo.list_id) {
                        const todos = category.todos?.filter(
                            (todo) => todo.id !== action.payload.todo.id,
                        );
                        category.todos = todos;
                    }
                    if (category.id === action.payload.newIdCategory) {
                        const todo = action.payload.todo;
                        todo.text = action.payload.newText;
                        todo.list_id = action.payload.newIdCategory;
                        category.todos?.push(action.payload.todo);
                    }
                    return category;
                });
                return {
                    state: copyState,
                };
            })();
        case TodoEnumAction.COMPLITED_TODO:
            return (() => {
                const copyState = state.state.map((category) => {
                    if (category.id === action.payload.listId) {
                        const todos = category.todos?.map((todo) => {
                            if (todo.id === action.payload.todoId) todo.checked = true;
                            return todo;
                        });
                        category.todos = todos;
                    }
                    return category;
                });

                return {
                    state: copyState,
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

export const editTodo = (payload: {
    todo: Todo;
    newText: string;
    newIdCategory: number;
}): TEditTodo => ({
    type: TodoEnumAction.EDIT_TODO,
    payload,
});

export const createComplitedTodo = (payload: {
    listId: number;
    todoId: number;
}): TComplitedTodo => ({
    type: TodoEnumAction.COMPLITED_TODO,
    payload,
});
