import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../../styles/global';
import BackButton from '../../shared/backButton';
import NextButton from '../../shared/nextButton';
import ListItemDisplay from '../../shared/listItemDisplay';

export default function DiaryDiet({ navigation }){
    const date = navigation.getParam('date');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const dateData = navigation.getParam('dateData');

    const diet = dateData.diet !== undefined ? dateData.diet : [];

    const [refreshToggle, setRefreshToggle] = useState(false);

    const refreshDiaryDiet = () => {
        setRefreshToggle(!refreshToggle);
    }

    const list = [];

    const editList = (itemIndex) => {
        // open edit list page
        // pass functions for discard and save buttons using itemIndex as an argument
        navigation.navigate('DiaryEditDiet', {itemIndex: itemIndex, dateData: dateData, date: date, refreshDiaryHome: refreshDiaryHome, refreshDiaryDiet: refreshDiaryDiet});
    }

    const nextScreenFunc = () => {
        navigation.navigate('DiaryHome');
    };

    for(let i=0; i<diet.length; i++){
        const startTime = diet[i].startTime;
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
            rightText: diet[i].type,
            key: i
        });
    }

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.contentContainerBN}> 
                <ScrollView>
                    <ListItemDisplay prompt="Which meals did you have today?" listItemName='Meal' list={list} color={{regular: globalStyles.diaryColor.color, select: globalStyles.diarySelectColor.color}} editList={editList} />
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