import { combineReducers } from 'redux';
import { todoReducer } from './reducers/todoReducer';

export const rootReducer = combineReducers({
    todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
