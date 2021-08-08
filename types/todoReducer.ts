import { StateModel } from '../model/stateModel';

export interface todoState {
    state: StateModel[];
}

export interface todoCategory {
    id: number;
    title: string;
    candidate_id?: number;
    created_at: string;
    updated_at: string;
    todos?: Todo[];
}

export interface Todo {
    id: number;
    text: string;
    list_id: number;
    checked: boolean;
    created_at: string;
    updated_at: string;
}

export enum TodoEnumAction {
    SET_TODOS = 'SET_TODOS',
    CREATE_LIST = 'CREATE_LIST',
    DELETE_LIST = 'DELETE_LIST',
    CREATE_TODO = 'CREATE_TODO',
    DELETE_TODO = 'DELETE_TODO',
    EDIT_TODO = 'EDIT_TODO',
    COMPLITED_TODO = 'COMPLITED_TODO',
}

export type TSetTodo = {
    type: TodoEnumAction.SET_TODOS;
    payload: StateModel[];
};

export type TCreateList = {
    type: TodoEnumAction.CREATE_LIST;
    payload: StateModel;
};

export type TDeleteList = {
    type: TodoEnumAction.DELETE_LIST;
    payload: number;
};

export type TCreatedTodo = {
    type: TodoEnumAction.CREATE_TODO;
    payload: Todo;
};

export type TDeleteTodo = {
    type: TodoEnumAction.DELETE_TODO;
    payload: {
        listId: number;
        todoId: number;
    };
};

export type TEditTodo = {
    type: TodoEnumAction.EDIT_TODO;
    payload: {
        todo: Todo;
        newText: string;
    };
};

export type TComplitedTodo = {
    type: TodoEnumAction.COMPLITED_TODO;
    payload: {
        listId: number;
        todoId: number;
    };
};

export type TRegisterAction =
    | TSetTodo
    | TCreateList
    | TDeleteList
    | TCreatedTodo
    | TDeleteTodo
    | TEditTodo
    | TComplitedTodo;
