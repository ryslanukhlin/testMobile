import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors, RadioButton } from 'react-native-paper';
import { useTypedSelector } from '../hooks/useTypedSelector';

const EditorTodo: React.FC = () => {
    const [text, setText] = React.useState<string>('');
    const [value, setValue] = React.useState<String>('');
    const categores = useTypedSelector((state) => state.todo.state);

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setText(text)}
                defaultValue={text}
                placeholder="Название задачи"
            />
            <RadioButton.Group onValueChange={(value) => setValue(value)} value={String(value)}>
                {categores.map((category) => (
                    <RadioButton.Item
                        key={category.id}
                        color={Colors.blue500}
                        label={category.title}
                        value={String(category.id)}
                    />
                ))}
            </RadioButton.Group>
        </View>
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
