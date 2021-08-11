import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { Colors, IconButton, List, TouchableRipple } from 'react-native-paper';
import { StateModel } from '../model/stateModel';
import Accordion from './Accordion';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigate';
import { Todo } from '../types/todoReducer';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import API from '../Api';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

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

    const renderHiddenItem = (data: ListRenderItemInfo<Todo>, rowMap: RowMap<Todo>) => (
        <View style={styles.rowBack}>
            <IconButton
                size={22}
                style={styles.editingSwiper}
                icon="pencil-outline"
                onPress={editListItem.bind(null, data.item)}
            />
            <IconButton
                size={22}
                style={styles.deleteSwipe}
                icon="trash-can-outline"
                color={Colors.red500}
                onPress={deleteListItem.bind(null, {
                    todoId: data.item.id,
                    listId: data.item.list_id,
                })}
            />
        </View>
    );

    return (
        <List.Section title={category.title}>
            {category.todos && category.todos.length !== 0 ? (
                <>
                    <SwipeListView
                        data={category.todos}
                        listKey={String('nocompluted' + category.id)}
                        keyExtractor={(item, index) => item + index.toString()}
                        renderItem={(todo) => {
                            if (todo.item.checked) return <></>;
                            return (
                                <TouchableRipple
                                    style={styles.rowFront}
                                    onPress={compliteTodo.bind(null, todo.item)}>
                                    <List.Item
                                        title={todo.item.text}
                                        left={(props) => (
                                            <List.Icon
                                                {...props}
                                                icon="checkbox-blank-circle-outline"
                                            />
                                        )}
                                    />
                                </TouchableRipple>
                            );
                        }}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                    {completedTodos!.length !== 0 ? (
                        <Accordion enabled={enabled} setEnabled={setEnabled} />
                    ) : null}
                    {enabled ? (
                        <SwipeListView
                            data={completedTodos}
                            listKey={String('compluted' + category.id)}
                            keyExtractor={(item, index) => item + index.toString()}
                            renderItem={(todo) => {
                                return (
                                    <List.Item
                                        style={styles.rowFront}
                                        title={
                                            <Text style={styles.pomplited}>{todo.item.text}</Text>
                                        }
                                        left={(props) => (
                                            <List.Icon
                                                {...props}
                                                color={Colors.blue500}
                                                icon="check"
                                            />
                                        )}
                                    />
                                );
                            }}
                            renderHiddenItem={renderHiddenItem}
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                    ) : null}
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
        backgroundColor: 'white',
        borderLeftColor: 'lightgrey',
        borderLeftWidth: 2,
        width: 55,
        borderRadius: 0,
        height: '100%',
    },
    editingSwiper: {
        backgroundColor: 'white',
        borderRightColor: 'lightgrey',
        borderRightWidth: 2,
        width: 55,
        borderRadius: 0,
        height: '100%',
    },
    emptyTitleList: {
        fontSize: 16,
        marginLeft: 30,
        paddingVertical: 5,
        color: Colors.red500,
    },
    rowFront: {
        backgroundColor: 'white',
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CategoryItem;
