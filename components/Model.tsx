import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import { Colors, IconButton, List, Modal, Portal } from 'react-native-paper';

import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { StateModel } from '../model/stateModel';

const ModalCustom: React.FC = () => {
    const uri = API_URL + '/list';
    const [text, setText] = React.useState<string>('');
    const isOpen = useTypedSelector((state) => state.page.modalVisibale);
    const categories = useTypedSelector((state) => state.todo.state);
    const { closeModel, deleteList, createList } = useTypeDispatch();

    const createCategory = async (): Promise<void | undefined> => {
        if (text.length === 0) return;
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: text }),
        });
        const date: StateModel = await response.json();
        setText('');
        createList(date);
    };

    const deleteCategory = async (id: number) => {
        await fetch(uri + `/${id}`, {
            method: 'DELETE',
        });
        deleteList(id);
    };

    return (
        <Portal>
            <Modal style={styles.modal} onDismiss={closeModel} visible={isOpen}>
                <View style={styles.modalWrapper}>
                    <List.Section>
                        {categories.map((category) => (
                            <List.Item
                                key={category.id}
                                title={category.title}
                                right={() => (
                                    <IconButton
                                        icon="trash-can-outline"
                                        color={Colors.red500}
                                        size={22}
                                        onPress={deleteCategory.bind(null, category.id)}
                                    />
                                )}
                            />
                        ))}
                        <List.Item
                            title=""
                            left={() => (
                                <TextInput
                                    style={styles.input}
                                    onChangeText={(text) => setText(text)}
                                    defaultValue={text}
                                    placeholder="Название задачи"
                                />
                            )}
                            right={() => (
                                <IconButton icon="plus" size={22} onPress={createCategory} />
                            )}
                        />
                    </List.Section>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modal: {
        position: 'relative',
        marginTop: '-100%',
        zIndex: 2,
    },
    modalWrapper: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    input: {
        width: '60%',
        height: 30,
        marginHorizontal: 2,
        fontSize: 16,
        paddingHorizontal: 5,
    },
});

export default ModalCustom;
