import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    setTodos,
    createList,
    deleteList,
    createdTodo,
    deleteTodo,
    editTodo,
    createComplitedTodo,
} from '../store/reducers/todoReducer';
import {
    openModel,
    closeModel,
    changeTodoTextInput,
    changeValueRadio,
    setEditTodo,
    setErrorStackbar,
    clearValueRadio,
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
    setEditTodo,
    editTodo,
    createComplitedTodo,
    setErrorStackbar,
    clearValueRadio,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
