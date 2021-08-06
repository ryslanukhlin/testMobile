import React from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

const Header = () => {
    return (
        <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.Content title="Задачи" />
            <Appbar.Action icon="shape-outline" onPress={() => {}} />
        </Appbar.Header>
    );
};

export default Header;
