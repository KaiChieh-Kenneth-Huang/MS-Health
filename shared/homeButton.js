import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function HomeButton({ navigation }) {
    const goHome = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.header}>
            <Feather name='home' size={28} onPress={goHome} style={styles.icon} />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        paddingHorizontal: 10,
    }
});