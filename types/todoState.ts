export interface RootState {
    id: number;
    title: string;
    candidate_id: number;
    created_at: string;
    updated_at: string;
    todos: Todo[];
}

interface Todo {
    id: number;
    text: string;
    list_id: number;
    checked: boolean;
    created_at: string;
    updated_at: string;
}
