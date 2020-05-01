import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../../styles/global';
import BackButton from '../../shared/backButton';
import NextButton from '../../shared/nextButton';
import {MaterialIcons, FontAwesome, SimpleLineIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import OptionSelector from '../../shared/optionSelector';

export default function DiaryMood({ navigation }){
    const date = navigation.getParam('date');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const dateData = navigation.getParam('dateData');
    let selectedIndex = null;


    const iconSize = 54;
    const options = [
        {text: 'Excited', value: 'Excited', icon: <MaterialIcons name='mood' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '1'},
        {text: 'Happy', value: 'Happy', icon: <FontAwesome name='smile-o' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '2'},
        {text: 'Neutral', value: 'Neutral', icon: <Entypo name='emoji-neutral' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '3'},
        {text: 'Irritated', value: 'Irritated', icon: <Entypo name='emoji-neutral' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '4'},
        {text: 'Sad', value: 'Sad', icon: <Entypo name='emoji-sad' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '5'},
        {text: 'Depressed', value: 'Depressed', icon: <Entypo name='emoji-sad' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '6'}
    ];

    const save = async (value) => {
        dateData.mood.type = value;
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
        const selectedVal = dateData.mood.type;
        for(let i=0; i<options.length; i++){
            if (selectedVal === options[i].value) {
                selectedIndex = i;
            }
        }
    } catch (e) {
        dateData.mood = {type: null};
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.contentContainerBN}> 
                <ScrollView>
                    <OptionSelector prompt="How do you feel today?" options={options} initSelectedIndex={selectedIndex} color={{regular: globalStyles.diaryColor.color, select: globalStyles.diarySelectColor.color}} save={save} />
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