import { combineReducers } from 'redux';
import { pageReducer } from './reducers/PageReducer';
import { todoReducer } from './reducers/todoReducer';

export const rootReducer = combineReducers({
    todo: todoReducer,
    page: pageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
