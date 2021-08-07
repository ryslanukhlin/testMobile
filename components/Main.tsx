import React from 'react';
import { plainToClass } from 'class-transformer';

import Header from '../components/Header';
import { StatusBar } from 'expo-status-bar';
import { StateModel } from '../model/stateModel';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import Category from './Category';
import ModalCustom from './Model';

const Main: React.FC = () => {
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
            <Header />
            <Category />
            <ModalCustom />
            <StatusBar style="auto" />
        </>
    );
};

export default Main;
