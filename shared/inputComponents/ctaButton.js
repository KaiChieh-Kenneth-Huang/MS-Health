import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../styles/global';

export default function CtaButton({value, style, operationFunc}) {
    
    return (
        <TouchableOpacity
            style={[styles.buttonStyle, style]}
            onPress={operationFunc}
        >
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 15,
        width: 130,
        borderRadius: 10,
        backgroundColor: '#1A73E8',
        textAlignVertical: 'center',
    },
    buttonText: {
        color: '#eee',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'roboto-regular',
    }
});