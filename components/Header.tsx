import React from 'react';
import { Appbar } from 'react-native-paper';

import { useTypeDispatch } from '../hooks/useTypedDispatch';

const Header: React.FC = () => {
    const { openModel } = useTypeDispatch();

    return (
        <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.Content title="Задачи" />
            <Appbar.Action icon="shape-outline" onPress={openModel} />
        </Appbar.Header>
    );
};

export default Header;
