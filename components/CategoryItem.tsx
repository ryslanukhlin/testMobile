import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, List, TouchableRipple } from 'react-native-paper';
import { StateModel } from '../model/stateModel';
import Accordion from './Accordion';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigate';
import { Todo } from '../types/todoReducer';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import API from '../Api';
import { useTypedSelector } from '../hooks/useTypedSelector';

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

    const { deleteTodo, createComplitedTodo } = useTypeDispatch();

    const deleteListItem = async (payload: { todoId: number; listId: number }) => {
        await API.deleteListItemRequest(payload);
        deleteTodo(payload);
    };

    const editListItem = (todo: Todo) => navigation.navigate('EditorTodo', { todo });

    const compliteTodo = async (todo: Todo) => {
        createComplitedTodo({ todoId: todo.id, listId: todo.list_id });
        await API.editorTodoRequest(todo.list_id, todo, todo.text, true);
    };

    const leftSwipe = () => {
        return (
            <View style={styles.editingSwiper}>
                <List.Icon icon="pencil-outline" />
            </View>
        );
    };

    const rightSwipe = () => {
        return (
            <View style={styles.deleteSwipe}>
                <List.Icon icon="trash-can-outline" color={Colors.red500} />
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
                                onSwipeableRightOpen={deleteListItem.bind(null, {
                                    todoId: todo.id,
                                    listId: todo.list_id,
                                })}
                                onSwipeableLeftOpen={editListItem.bind(null, todo)}
                                renderRightActions={rightSwipe.bind(null, todo)}
                                renderLeftActions={leftSwipe.bind(null, todo)}>
                                <TouchableRipple onPress={compliteTodo.bind(null, todo)}>
                                    <List.Item
                                        title={todo.text}
                                        left={(props) => (
                                            <List.Icon
                                                {...props}
                                                icon="checkbox-blank-circle-outline"
                                            />
                                        )}
                                    />
                                </TouchableRipple>
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
                                  onSwipeableRightOpen={deleteListItem.bind(null, {
                                      todoId: completedTodo.id,
                                      listId: completedTodo.list_id,
                                  })}
                                  onSwipeableLeftOpen={editListItem.bind(null, completedTodo)}
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
