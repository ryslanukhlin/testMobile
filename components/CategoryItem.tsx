import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, List, IconButton } from 'react-native-paper';
import { StateModel } from '../model/stateModel';
import Accordion from './Accordion';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface props {
    category: StateModel;
}

const CategoryItem: React.FC<props> = ({ category }) => {
    const [enabled, setEnabled] = React.useState<boolean>(false);
    const completedTodos = category.todos.filter((todo) => todo.checked === true);

    const leftSwipe = () => {
        return (
            <View style={styles.editingSwiper}>
                <IconButton
                    icon="pencil-outline"
                    size={22}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        );
    };

    const rightSwipe = () => {
        return (
            <View style={styles.deleteSwipe}>
                <IconButton
                    icon="trash-can-outline"
                    color={Colors.red500}
                    size={22}
                    onPress={() => console.log('Pressed')}
                />
            </View>
        );
    };

    return (
        <List.Section title={category.title}>
            {category.todos.map((todo) =>
                !todo.checked ? (
                    <Swipeable
                        key={todo.id}
                        renderRightActions={rightSwipe}
                        renderLeftActions={leftSwipe}>
                        <List.Item
                            title={todo.text}
                            left={(props) => (
                                <List.Icon {...props} icon="checkbox-blank-circle-outline" />
                            )}
                        />
                    </Swipeable>
                ) : null,
            )}
            {completedTodos.length !== 0 ? (
                <Accordion enabled={enabled} setEnabled={setEnabled} />
            ) : null}
            {enabled
                ? completedTodos.map((completedTodo) => (
                      <Swipeable
                          key={completedTodo.id}
                          renderRightActions={rightSwipe}
                          renderLeftActions={leftSwipe}>
                          <List.Item
                              title={<Text style={styles.pomplited}>{completedTodo.text}</Text>}
                              left={(props) => (
                                  <List.Icon {...props} color={Colors.blue500} icon="check" />
                              )}
                          />
                      </Swipeable>
                  ))
                : null}
        </List.Section>
    );
};

const styles = StyleSheet.create({
    pomplited: {
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    deleteSwipe: {
        borderLeftColor: 'lightgrey',
        borderLeftWidth: 1,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    editingSwiper: {
        borderRightColor: 'lightgrey',
        borderRightWidth: 1,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CategoryItem;
