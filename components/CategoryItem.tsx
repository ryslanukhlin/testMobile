import React from 'react';
import { List } from 'react-native-paper';
import { StateModel } from '../model/stateModel';

interface props {
    category: StateModel;
}

const CategoryItem: React.FC<props> = ({ category }) => {
    const completedTodos = category.todos.filter((todo) => todo.checked === true);

    return (
        <List.Section title={category.title}>
            {category.todos.map((todo) =>
                !todo.checked ? (
                    <List.Item
                        key={todo.id}
                        title={todo.text}
                        left={(props) => (
                            <List.Icon {...props} icon="checkbox-blank-circle-outline" />
                        )}
                    />
                ) : null,
            )}
        </List.Section>
    );
};

export default CategoryItem;
