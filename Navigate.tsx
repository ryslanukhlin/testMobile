import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { IconButton, Colors } from 'react-native-paper';
import Main from './pages/Main';
import { useTypeDispatch } from './hooks/useTypedDispatch';
import EditorTodo from './pages/EditorTodo';

export type RootStackParamList = {
    Main: undefined;
    EditorTodo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigate = () => {
    const { openModel } = useTypeDispatch();

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
                        headerRight: () => <IconButton icon="check" color={Colors.blue500} />,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigate;
