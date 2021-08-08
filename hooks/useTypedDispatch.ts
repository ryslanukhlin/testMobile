import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    setTodos,
    createList,
    deleteList,
    createdTodo,
    deleteTodo,
} from '../store/reducers/todoReducer';
import {
    openModel,
    closeModel,
    changeTodoTextInput,
    changeValueRadio,
} from '../store/reducers/PageReducer';

const actionCreater = {
    setTodos,
    openModel,
    closeModel,
    createList,
    deleteList,
    changeTodoTextInput,
    changeValueRadio,
    createdTodo,
    deleteTodo,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
