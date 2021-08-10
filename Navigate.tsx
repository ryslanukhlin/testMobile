import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { Todo } from './types/todoReducer';

import { HeaderActionEditPage, HeaderActionModal } from './components/HeaderActionEditPage';
import Main from './pages/Main';
import EditorTodo from './pages/EditorTodo';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'white',
    },
};

export type RootStackParamList = {
    Main: undefined;
    EditorTodo?: { todo?: Todo };
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigate = () => (
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={Main}
                options={{
                    headerTitle: () => <Title style={styles.title}>Задачи</Title>,
                    headerRight: () => <HeaderActionModal />,
                }}
            />
            <Stack.Screen
                name="EditorTodo"
                component={EditorTodo}
                options={{
                    title: '',
                    headerRight: () => <HeaderActionEditPage />,
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    title: {
        marginLeft: 40,
    },
});

export default Navigate;
