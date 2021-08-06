import React from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import CategoryItem from './CategoryItem';

const Category: React.FC = () => {
    const categores = useTypedSelector((state) => state.todo.state);

    return (
        <>
            {categores.map((category) => (
                <CategoryItem key={category.id} category={category} />
            ))}
        </>
    );
};

export default Category;
