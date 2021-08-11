import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { FAB, Colors } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import API from '../Api';

import Category from '../components/Category';
import ModalCustom from '../components/Model';
import { RootStackParamList } from '../Navigate';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const Main: React.FC<Props> = ({ navigation }) => {
    const { setTodos } = useTypeDispatch();

    React.useEffect(() => {
        (async () => {
            setTodos(await API.getList());
        })();
    }, []);

    return (
        <>
            <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('EditorTodo')} />
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
