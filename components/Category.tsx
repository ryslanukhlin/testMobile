import React from 'react';
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CategoryItem from './CategoryItem';

const Category: React.FC = () => {
    const categores = useTypedSelector((state) => state.todo.state);

    return (
        <FlatList
            style={{ zIndex: 1 }}
            data={categores}
            renderItem={({ item }) => <CategoryItem category={item} />}
            keyExtractor={(item) => String(item.id)}
        />
    );
};

export default Category;
