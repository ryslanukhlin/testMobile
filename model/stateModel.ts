import { Todo } from '../types/todoReducer';

export class StateModel {
    id!: number;
    title!: string;
    candidate_id!: number;
    created_at!: string;
    updated_at!: string;
    todos!: Todo[];
}
