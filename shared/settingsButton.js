import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Feather} from '@expo/vector-icons';

export default function SettingsButton({ navigation }) {
    const viewSettings = () => {
        navigation.navigate('Settings');
    }

    return (
        <View style={styles.header}>
            <Feather name='settings' size={28} onPress={viewSettings} style={styles.icon} />
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