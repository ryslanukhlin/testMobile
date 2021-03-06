import React from 'react';
import { View, StyleSheet, TextInput, ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, IconButton, List, Modal, Portal, Snackbar } from 'react-native-paper';
import API from '../Api';
import { Dimensions } from 'react-native';

import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { StateModel } from '../model/stateModel';

const ModalCustom: React.FC = () => {
    const [visible, setVisible] = React.useState(false);
    const [text, setText] = React.useState<string>('');
    const isOpen = useTypedSelector((state) => state.page.modalVisibale);
    const categories = useTypedSelector((state) => state.todo.state);
    const { closeModel, deleteList, createList } = useTypeDispatch();

    const createCategory = async (): Promise<void | undefined> => {
        if (!text.trim().length) return setVisible(true);
        const date = await API.createCategoryRequest(text);
        setText('');
        createList(date);
    };

    const deleteCategory = async (id: number) => {
        await API.deleteCategoryRequest(id);
        deleteList(id);
    };

    const onDismissSnackBar = () => setVisible(false);

    return (
        <Portal>
            <Snackbar style={styles.snackbar} visible={visible} onDismiss={onDismissSnackBar}>
                Пустой поле
            </Snackbar>
            <Modal style={styles.modal} onDismiss={closeModel} visible={isOpen}>
                <View style={styles.modalWrapper}>
                    <List.Section>
                        <FlatList
                            style={{ marginBottom: 60 }}
                            data={categories}
                            keyExtractor={(item: StateModel) => String(item.id)}
                            renderItem={(item: ListRenderItemInfo<StateModel>) => (
                                <List.Item
                                    title={item.item.title}
                                    right={() => (
                                        <IconButton
                                            icon="trash-can-outline"
                                            color={Colors.red500}
                                            size={22}
                                            onPress={deleteCategory.bind(null, item.item.id)}
                                        />
                                    )}
                                />
                            )}
                        />
                        <List.Item
                            style={styles.inputWrapper}
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

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    modal: {
        position: 'relative',
        marginTop: '-100%',
        zIndex: 2,
        maxHeight: '100%',
        paddingTop: '60%',
    },
    modalWrapper: {
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        maxHeight: 400,
    },
    input: {
        width: '60%',
        height: 30,
        marginHorizontal: 2,
        fontSize: 16,
        paddingHorizontal: 5,
        marginBottom: 60,
    },
    inputWrapper: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -55,
        width: '100%',
    },
    snackbar: {
        backgroundColor: Colors.red500,
        color: 'white',
        bottom: screenHeight - 180,
    },
});

export default ModalCustom;
