import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Colors, RadioButton } from 'react-native-paper';
import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RootStackParamList } from '../Navigate';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditorTodo'>;
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditorTodo'>;

type Props = {
    navigation: ProfileScreenNavigationProp;
    route: ProfileScreenRouteProp;
};

const EditorTodo: React.FC<Props> = ({ route }) => {
    const { todoTextInput, valueRaduo } = useTypedSelector((state) => state.page);
    const { changeTodoTextInput, changeValueRadio, setEditTodo } = useTypeDispatch();
    const categores = useTypedSelector((state) => state.todo.state);

    React.useEffect(() => {
        if (route.params) {
            changeTodoTextInput(route.params.todo?.text!);
            setEditTodo(route.params.todo!);
            changeValueRadio(route.params.todo?.list_id!);
        } else {
            if (categores.length !== 0) changeValueRadio(categores[0].id);
        }
    }, []);

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={(text) => changeTodoTextInput(text)}
                defaultValue={todoTextInput}
                placeholder="Название задачи"
            />
            <RadioButton.Group
                onValueChange={(value) => changeValueRadio(+value)}
                value={String(valueRaduo)}>
                {categores.map((category) => (
                    <RadioButton.Item
                        key={category.id}
                        color={Colors.blue500}
                        label={category.title}
                        value={String(category.id)}
                    />
                ))}
            </RadioButton.Group>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        marginHorizontal: 18,
        paddingHorizontal: 10,
        marginTop: 15,
        fontSize: 20,
    },
});

export default EditorTodo;
