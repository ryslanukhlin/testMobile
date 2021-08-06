import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import 'reflect-metadata';

import { createStore } from 'redux';
import { rootReducer } from './store';
import Main from './components/Main';

const store = createStore(rootReducer);

const App: React.FC = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider>
                <Main />
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;
