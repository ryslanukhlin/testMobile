import React from 'react';
import { ListRenderItemInfo, VirtualizedList } from 'react-native';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { StateModel } from '../model/stateModel';
import CategoryItem from './CategoryItem';

const Category: React.FC = () => {
    const categores = useTypedSelector((state) => state.todo.state);
    return (
        <VirtualizedList
            data={categores}
            renderItem={(info: ListRenderItemInfo<StateModel>) => (
                <CategoryItem key={info.item.id} category={info.item} />
            )}
            keyExtractor={(item, index) => item + index.toString()}
            getItem={(data, index) => data[index]}
            getItemCount={(data) => data.length}
        />
    );
};

export default Category;
