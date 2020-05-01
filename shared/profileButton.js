import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function ProfileButton({ navigation }) {
    const viewProfile = () => {
        navigation.navigate('Profile');
    }

    return (
        <View style={styles.header}>
            <MaterialIcons name='person-outline' size={36} onPress={viewProfile} style={styles.icon} />
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