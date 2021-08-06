import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setTodos } from '../store/reducers/todoReducer';

const actionCreater = {
    setTodos,
};

export const useTypeDispatch = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actionCreater, dispatch);
};
