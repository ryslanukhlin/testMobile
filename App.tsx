import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import 'reflect-metadata';
import { createStore } from 'redux';
import { rootReducer } from './store';

import Navigate from './Navigate';

const store = createStore(rootReducer);

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'red',
    },
};
const App: React.FC = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <Navigate />
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;
