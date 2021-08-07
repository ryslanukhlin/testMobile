import React from 'react';
import { plainToClass } from 'class-transformer';
import { StatusBar } from 'expo-status-bar';
import { StateModel } from '../model/stateModel';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import Category from './Category';
import ModalCustom from './Model';
import { Button } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Navigate';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
};

const Main: React.FC<Props> = ({ navigation }) => {
    const { setTodos } = useTypeDispatch();

    React.useLayoutEffect(() => {
        (async () => {
            const response = await fetch(
                'http://mobile-dev.oblakogroup.ru/candidate/RyslanYhlin/list',
            );
            const date: StateModel[] = await response.json();
            const stateModel = plainToClass(StateModel, date);
            setTodos(stateModel);
        })();
    }, []);

    return (
        <>
            <Category />
            <ModalCustom />
            <StatusBar style="auto" />
        </>
    );
};

export default Main;
