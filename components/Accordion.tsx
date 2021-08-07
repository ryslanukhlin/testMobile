import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

interface props {
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    enabled: boolean;
}

const Accordion: React.FC<props> = ({ setEnabled, enabled }) => {
    return (
        <TouchableRipple onPress={() => setEnabled((prev) => !prev)}>
            <View style={styles.container}>
                <Image
                    source={
                        enabled
                            ? require(`../assets/chevron-up.png`)
                            : require(`../assets/chevron-down.png`)
                    }
                />
                <Text style={styles.text}>Завершенные</Text>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        padding: 15,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        marginLeft: 33,
        fontSize: 16,
    },
});

export default Accordion;
