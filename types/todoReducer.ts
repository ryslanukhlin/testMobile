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
    todos: Todo[];
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
}

export type TSetTodo = {
    type: TodoEnumAction.SET_TODOS;
    payload: StateModel[];
};

export type TRegisterAction = TSetTodo;
