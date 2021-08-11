import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Colors, IconButton } from 'react-native-paper';
import API from '../Api';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RootStackParamList } from '../Navigate';

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
        const date = await API.createdNewTodoRequest(valueRaduo!, todoTextInput);
        createdTodo(date);
        changeTodoTextInput('');
    };

    const editorTodo = async () => {
        editotTodoList({ newText: todoTextInput, todo: editTodo!, newIdCategory: valueRaduo! });
        await API.editorTodoRequest(valueRaduo!, editTodo!, todoTextInput);
        changeTodoTextInput('');
    };

    const onPressButton = () => {
        if (categories.length === 0)
            return setErrorStackbar({ error: true, text: 'Сначало нужно создать категорию' });
        if (!todoTextInput.trim().length)
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
