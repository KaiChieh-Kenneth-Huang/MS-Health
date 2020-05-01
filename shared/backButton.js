import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import {Ionicons} from '@expo/vector-icons';

export default function BackButton({ navigation }) {

    const pressHandler = () => {
        navigation.navigate(navigation.getParam('prevScreen'));
    }

    return (
        <TouchableOpacity style={[globalStyles.backNextButton, {left: 0, justifyContent: 'flex-start'}]} onPress={pressHandler}>
                <Ionicons name='ios-arrow-back' size={28} style={globalStyles.backNextButtonIcon} />
                <Text style={globalStyles.backNextText}>
                    BACK
                </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    
});