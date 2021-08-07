import React from 'react';
import { StyleSheet } from 'react-native';
import { plainToClass } from 'class-transformer';
import { StatusBar } from 'expo-status-bar';
import { StateModel } from '../model/stateModel';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import Category from '../components/Category';
import ModalCustom from '../components/Model';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigate';
import { API_URL } from 'react-native-dotenv';
import { FAB, Colors } from 'react-native-paper';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const Main: React.FC<Props> = ({ navigation }) => {
    const { setTodos } = useTypeDispatch();

    React.useLayoutEffect(() => {
        (async () => {
            const uri = API_URL + '/list';
            const response = await fetch(uri);
            const date: StateModel[] = await response.json();
            const stateModel = plainToClass(StateModel, date);
            setTodos(stateModel);
        })();
    }, []);

    return (
        <>
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => navigation.navigate('EditorTodo')}
            />
            <Category />
            <ModalCustom />
            <StatusBar style="auto" />
        </>
    );
};

const styles = StyleSheet.create({
    fab: {
        backgroundColor: Colors.blue500,
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 2,
    },
});

export default Main;
