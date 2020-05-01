import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../../styles/global';
import BackButton from '../../shared/backButton';
import NextButton from '../../shared/nextButton';
import {MaterialIcons, FontAwesome, SimpleLineIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import OptionSelector from '../../shared/optionSelector';

export default function DiaryEnergy({ navigation }){
    const date = navigation.getParam('date');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const dateData = navigation.getParam('dateData');
    let selectedIndex = null;


    const iconSize = 54;
    const options = [
        {text: 'Very High', value: 5, icon: <MaterialIcons name='mood' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '1'},
        {text: 'High', value: 4, icon: <FontAwesome name='smile-o' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '2'},
        {text: 'Neutral', value: 3, icon: <Entypo name='emoji-neutral' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '3'},
        {text: 'Low', value: 2, icon: <Entypo name='emoji-sad' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '4'},
        {text: 'Very Low', value: 1, icon: <Entypo name='emoji-sad' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '5'},
    ];

    const save = async (value) => {
        dateData.energy.value = value;
        try {
            await AsyncStorage.setItem(date.toDateString(), JSON.stringify(dateData));
            refreshDiaryHome();
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }
    };

    const nextScreenFunc = () => {
        navigation.navigate('DiaryHome');
    };

    try {
        const selectedVal = dateData.energy.value;
        for(let i=0; i<options.length; i++){
            if (selectedVal === options[i].value) {
                selectedIndex = i;
            }
        }
    } catch (e) {
        dateData.energy = {value: null};
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.contentContainerBN}> 
                <ScrollView>
                    <OptionSelector prompt="What is your energy level today?" options={options} initSelectedIndex={selectedIndex} color={{regular: globalStyles.diaryColor.color, select: globalStyles.diarySelectColor.color}} save={save} />
                </ScrollView>
            </View>
            <View style={globalStyles.backNextBtnContainer}>
                <BackButton navigation={navigation}/>
                <NextButton navigation={navigation} nextScreenFunc={nextScreenFunc}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});