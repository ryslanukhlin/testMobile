import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, RadioButton, Snackbar } from 'react-native-paper';
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
    const { todoTextInput, valueRaduo, errorSnackbarText, errorSnackbarActuvete } =
        useTypedSelector((state) => state.page);

    const {
        changeTodoTextInput,
        changeValueRadio,
        setEditTodo,
        setErrorStackbar,
        clearValueRadio,
    } = useTypeDispatch();

    const categores = useTypedSelector((state) => state.todo.state);

    const onDismissSnackBar = () => setErrorStackbar({ error: false });

    React.useEffect(() => {
        if (route.params) {
            changeTodoTextInput(route.params.todo?.text!);
            setEditTodo(route.params.todo!);
        }
        return () => {
            clearValueRadio();
            setErrorStackbar({ error: false });
            changeTodoTextInput('');
            setEditTodo(null);
        };
    }, []);

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={(text) => changeTodoTextInput(text)}
                defaultValue={todoTextInput}
                placeholder="Название задачи"
            />
            <ScrollView>
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
            </ScrollView>
            <Snackbar
                style={styles.snackbar}
                visible={errorSnackbarActuvete!}
                onDismiss={onDismissSnackBar}>
                {errorSnackbarText}
            </Snackbar>
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
    snackbar: {
        backgroundColor: Colors.red500,
        color: 'white',
    },
});

export default EditorTodo;
