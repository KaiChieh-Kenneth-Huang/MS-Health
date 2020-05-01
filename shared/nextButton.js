import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import {Ionicons} from '@expo/vector-icons';

export default function NextButton({ navigation, nextScreenFunc }) {
    return (
        <TouchableOpacity style={[globalStyles.backNextButton, {right: 0, justifyContent: 'flex-end'}]} onPress={nextScreenFunc}>
                <Text style={globalStyles.backNextText}>
                    NEXT
                </Text>
                <Ionicons name='ios-arrow-forward' size={28} style={globalStyles.backNextButtonIcon} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
});