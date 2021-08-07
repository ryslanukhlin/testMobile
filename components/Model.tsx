import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, IconButton, List, Modal, Portal, TextInput } from 'react-native-paper';

import { useTypeDispatch } from '../hooks/useTypedDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';

const ModalCustom: React.FC = () => {
    const isOpen = useTypedSelector((state) => state.page.modalVisibale);
    const categories = useTypedSelector((state) => state.todo.state);
    const { closeModel } = useTypeDispatch();

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
                                        onPress={() => console.log('Pressed')}
                                    />
                                )}
                            />
                        ))}
                        <List.Item
                            title="Новая категория"
                            right={() => (
                                <IconButton
                                    icon="plus"
                                    size={22}
                                    onPress={() => console.log('Pressed')}
                                />
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
        marginTop: 0,
        zIndex: 2,
    },
    modalWrapper: {
        backgroundColor: 'white',
    },
});

export default ModalCustom;
