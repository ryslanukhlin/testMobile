import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import Main from './components/Main';
import { useTypeDispatch } from './hooks/useTypedDispatch';

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
                <Stack.Screen name="EditorTodo" component={() => <Text>editor todo</Text>} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigate;
