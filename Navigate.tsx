import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import Main from './pages/Main';
import { useTypeDispatch } from './hooks/useTypedDispatch';
import EditorTodo from './pages/EditorTodo';
import { useTypedSelector } from './hooks/useTypedSelector';
import { API_URL } from 'react-native-dotenv';
import { Todo } from './types/todoReducer';

export type RootStackParamList = {
    Main: undefined;
    EditorTodo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigate = () => {
    const { todoTextInput, valueRaduo } = useTypedSelector((state) => state.page);
    const { openModel, changeTodoTextInput, createdTodo } = useTypeDispatch();

    const createdNewTodo = async () => {
        if (todoTextInput.length === 0) return;
        const uri = API_URL + `/list/${valueRaduo}/todo`;
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: todoTextInput }),
        });
        const date: Todo = await response.json();
        changeTodoTextInput('');
        createdTodo(date);
    };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={Main}
                    options={{
                        headerTitle: 'Главная',
                        headerRight: () => <IconButton icon="shape-outline" onPress={openModel} />,
                    }}
                />
                <Stack.Screen
                    name="EditorTodo"
                    component={EditorTodo}
                    options={{
                        title: '',
                        headerRight: () => (
                            <IconButton
                                onPress={createdNewTodo}
                                icon="check"
                                color={Colors.blue500}
                            />
                        ),
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigate;
