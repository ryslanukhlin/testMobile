import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, List, IconButton } from 'react-native-paper';
import { StateModel } from '../model/stateModel';
import Accordion from './Accordion';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigate';
import { Todo } from '../types/todoReducer';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { API_URL } from 'react-native-dotenv';

interface props {
    category: StateModel;
}

const CategoryItem: React.FC<props> = ({ category }) => {
    const [enabled, setEnabled] = React.useState<boolean>(false);
    let completedTodos: Todo[] | undefined;
    if (category.todos) {
        completedTodos = category.todos.filter((todo) => todo.checked === true);
    }

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { deleteTodo } = useTypeDispatch();

    const deleteListItem = async (payload: { todoId: number; listId: number }) => {
        const uri = API_URL + `/list/${payload.listId}/todo/${payload.todoId}`;
        await fetch(uri, { method: 'DELETE' });
        deleteTodo(payload);
    };

    const editListItem = (todo: Todo) => navigation.navigate('EditorTodo', { todo });

    const leftSwipe = (todo: Todo) => {
        return (
            <View style={styles.editingSwiper}>
                <IconButton
                    icon="pencil-outline"
                    size={22}
                    onPress={editListItem.bind(null, todo)}
                />
            </View>
        );
    };

    const rightSwipe = (todo: Todo) => {
        return (
            <View style={styles.deleteSwipe}>
                <IconButton
                    icon="trash-can-outline"
                    color={Colors.red500}
                    size={22}
                    onPress={deleteListItem.bind(null, { todoId: todo.id, listId: todo.list_id })}
                />
            </View>
        );
    };

    return (
        <List.Section title={category.title}>
            {category.todos && category.todos.length !== 0 ? (
                <>
                    {category.todos.map((todo) =>
                        !todo.checked ? (
                            <Swipeable
                                key={todo.id}
                                renderRightActions={rightSwipe.bind(null, todo)}
                                renderLeftActions={leftSwipe.bind(null, todo)}>
                                <List.Item
                                    title={todo.text}
                                    left={(props) => (
                                        <List.Icon
                                            {...props}
                                            icon="checkbox-blank-circle-outline"
                                        />
                                    )}
                                />
                            </Swipeable>
                        ) : null,
                    )}
                    {completedTodos!.length !== 0 ? (
                        <Accordion enabled={enabled} setEnabled={setEnabled} />
                    ) : null}
                    {enabled
                        ? completedTodos?.map((completedTodo) => (
                              <Swipeable
                                  key={completedTodo.id}
                                  renderRightActions={rightSwipe.bind(null, completedTodo)}
                                  renderLeftActions={leftSwipe.bind(null, completedTodo)}>
                                  <List.Item
                                      title={
                                          <Text style={styles.pomplited}>{completedTodo.text}</Text>
                                      }
                                      left={(props) => (
                                          <List.Icon
                                              {...props}
                                              color={Colors.blue500}
                                              icon="check"
                                          />
                                      )}
                                  />
                              </Swipeable>
                          ))
                        : null}
                </>
            ) : (
                <Text style={styles.emptyTitleList}>Список Пуст</Text>
            )}
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
    emptyTitleList: {
        fontSize: 16,
        marginLeft: 30,
        paddingVertical: 5,
        color: Colors.red500,
    },
});

export default CategoryItem;
