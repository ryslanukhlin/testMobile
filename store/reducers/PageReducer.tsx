import {
    pageEnumAction,
    TCloseModel,
    todoState,
    TOpenModel,
    TRageAction,
} from '../../types/pageReducer';

const defaultState: todoState = {
    modalVisibale: false,
};

export const pageReducer = (state = defaultState, action: TRageAction): todoState => {
    switch (action.type) {
        case pageEnumAction.OPEN_MODEL:
            return { modalVisibale: true };
        case pageEnumAction.CLOSE_MODEL:
            return { modalVisibale: false };
        default:
            return state;
    }
};

export const openModel = (): TOpenModel => ({
    type: pageEnumAction.OPEN_MODEL,
});

export const closeModel = (): TCloseModel => ({
    type: pageEnumAction.CLOSE_MODEL,
});
