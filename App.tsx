import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import 'reflect-metadata';
import { StatusBar } from 'expo-status-bar';

import Header from './components/Header';

const App: React.FC = () => {
    React.useEffect(() => {
        (async () => {
            const response = await fetch(
                'http://mobile-dev.oblakogroup.ru/candidate/RyslanYhlin/list',
            );
            const date = await response.json();
        })();
    }, []);

    return (
        <Provider>
            <Header />
            <StatusBar style="auto" />
        </Provider>
    );
};

export default App;
