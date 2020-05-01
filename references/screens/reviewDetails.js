import React from 'react';
import {StyleSheet, View,Text, Button} from 'react-native';
import {globalStyles} from '../styles/global';

export default function ReviewDetails({navigation}){
    const pressHandler = () => {
        navigation.goBack();
    }
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Review Details</Text>
            <Button title='back to home screen' onPress={pressHandler} />
            <Text>{navigation.getParam('title')}</Text>
        </View>
    )
}