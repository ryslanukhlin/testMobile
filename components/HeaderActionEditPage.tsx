import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { API_URL } from 'react-native-dotenv';
import { Colors, IconButton } from 'react-native-paper';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RootStackParamList } from '../Navigate';
import { Todo } from '../types/todoReducer';

export const HeaderActionEditPage: React.FC = () => {
    const { state: categories } = useTypedSelector((state) => state.todo);
    const { todoTextInput, valueRaduo, editTodo } = useTypedSelector((state) => state.page);
    const {
        changeTodoTextInput,
        createdTodo,
        editTodo: editotTodoList,
        setErrorStackbar,
    } = useTypeDispatch();

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const createdNewTodo = async () => {
        if (todoTextInput.length === 0) return;
        const uri = API_URL + `/list/${valueRaduo}/todo`;
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: todoTextInput }),
        });
        const date: Todo = await response.json();
        changeTodoTextInput('');
        createdTodo(date);
    };

    const editorTodo = async () => {
        if (todoTextInput.length === 0) return;
        const uri = API_URL + `/list/${valueRaduo}/todo/${editTodo?.id}`;
        await fetch(uri, {
            method: 'PATCH ',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: todoTextInput }),
        });
        changeTodoTextInput('');
        editotTodoList({ newText: todoTextInput, todo: editTodo! });
    };

    const onPressButton = () => {
        if (categories.length === 0)
            return setErrorStackbar({ error: true, text: 'Сначало нужно создать категорию' });
        if (todoTextInput.length === 0)
            return setErrorStackbar({ error: true, text: 'Пустое значение поля' });
        if (!valueRaduo) return setErrorStackbar({ error: true, text: 'Не выбрана категория' });
        editTodo !== null ? editorTodo() : createdNewTodo();
        return navigation.navigate('Main');
    };

    return <IconButton onPress={onPressButton} icon="check" color={Colors.blue500} />;
};

export const HeaderActionModal: React.FC = () => {
    const { openModel } = useTypeDispatch();

    return <IconButton icon="shape-outline" onPress={openModel} />;
};
