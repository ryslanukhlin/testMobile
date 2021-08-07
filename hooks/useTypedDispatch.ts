import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setTodos } from '../store/reducers/todoReducer';
import { openModel, closeModel } from '../store/reducers/PageReducer';

const actionCreater = {
    setTodos,
    openModel,
    closeModel,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
