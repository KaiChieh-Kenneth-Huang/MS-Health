import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../../styles/global';
import BackButton from '../../shared/backButton';
import NextButton from '../../shared/nextButton';
import ListItemDisplay from '../../shared/listItemDisplay';

export default function DiarySymptoms({ navigation }){
    const date = navigation.getParam('date');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const dateData = navigation.getParam('dateData');

    const symptoms = dateData.symptoms !== undefined ? dateData.symptoms : [];

    const [refreshToggle, setRefreshToggle] = useState(false);

    const refreshDiarySymptoms = () => {
        setRefreshToggle(!refreshToggle);
    }
    const list = [
        // {leftText: '11:00 AM', rightText: 'Nausia', key: '11'},
        // {leftText: '11:00 AM', rightText: 'Dizziness', key: '12'},
        // {leftText: '11:00 AM', rightText: 'Drowsiness', key: '13'},
        // {leftText: '11:00 AM', rightText: 'Numbness', key: '14'},
    ];

    const editList = (itemIndex) => {
        // open edit list page
        // pass functions for discard and save buttons using itemIndex as an argument
        navigation.navigate('DiaryEditSymptom', {itemIndex: itemIndex, dateData: dateData, date: date, refreshDiaryHome: refreshDiaryHome, refreshDiarySymptoms: refreshDiarySymptoms});
    }

    const nextScreenFunc = () => {
        navigation.navigate('DiaryHome');
    };  

    for(let i=0; i<symptoms.length; i++){
        const startTime = symptoms[i].startTime;
        let timeStr = '';

        if(startTime !== null && startTime !== undefined){
            const hour = Math.floor(startTime / 60);
            const minute = startTime % 60;
            const smallHour = hour > 12 ? hour - 12 : hour;
            let hrStr = '';
            let minStr = '';

            if(smallHour < 10){
                hrStr += '0' + smallHour;
            }else{
                hrStr += smallHour;
            }

            if(minute < 10){
                minStr += '0' + minute;
            }else{
                minStr += minute;
            }

            timeStr += hrStr;
            timeStr += ':' + minStr + (hour < 12 ? ' AM' : ' PM');
        }
        

        list.push({
            leftText: timeStr,
            rightText: symptoms[i].type,
            key: i
        });
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.contentContainerBN}> 
                <ScrollView>
                    <ListItemDisplay prompt="What are your symptoms today?" listItemName='Symptom' list={list} color={{regular: globalStyles.diaryColor.color, select: globalStyles.diarySelectColor.color}} editList={editList} />
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