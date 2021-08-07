import React from 'react';
import { FlatList } from 'react-native';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CategoryItem from './CategoryItem';

const Category: React.FC = () => {
    const categores = useTypedSelector((state) => state.todo.state);

    return (
        <FlatList
            data={categores}
            renderItem={({ item }) => <CategoryItem key={item.id} category={item} />}
        />
    );
};

export default Category;
