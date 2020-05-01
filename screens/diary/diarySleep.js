import React, {useState} from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../../styles/global';
import BackButton from '../../shared/backButton';
import NextButton from '../../shared/nextButton';
import ListItemDisplay from '../../shared/listItemDisplay';
import TimeSelector from '../../shared/inputComponents/timeSelector';
import ValueSelector from '../../shared/inputComponents/valueSelector';

export default function DiarySleep({ navigation }){
    const date = navigation.getParam('date');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const dateData = navigation.getParam('dateData');

    const sleep = dateData.sleep !== undefined ? dateData.sleep : null;

    const [refreshToggle, setRefreshToggle] = useState(false);

    const [startTime, setStartTime] = useState(dateData.sleep === undefined ? null : dateData.sleep.startTime); 
    const [endTime, setEndTime] = useState(dateData.sleep === undefined ? null : dateData.sleep.endTime); 
    const [quality, setQuality] = useState(dateData.sleep === undefined ? null : dateData.sleep.value); 

    const refreshDiarySleep = () => {
        setRefreshToggle(!refreshToggle);
    }

    const nextScreenFunc = () => {
        dateData.sleep = {startTime: startTime, endTime: endTime, value: quality};
        save();
        navigation.navigate('DiaryHome');
    };

    const save = async () => {
        try {
            await AsyncStorage.setItem(date.toDateString(), JSON.stringify(dateData));
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }

        refreshDiaryHome();
    };

    return (
        <View style={globalStyles.container}>
            <View style={globalStyles.contentContainerBN}> 
                <ScrollView>
                    <Text style={globalStyles.prompt}>How did you sleep last night?</Text>
                    <ValueSelector style={styles.widgetBottomMargin} highValueText='Well' lowValueText='Poorly' value={quality} lowValue={1} highValue={5} setValue={setQuality} />
                    <Text style={[globalStyles.contentText, styles.selectionTitle]}>Went to bed at (last night):</Text>
                    <TimeSelector style={styles.widgetBottomMargin} time={startTime} setTime={setStartTime} />
                    <Text style={[globalStyles.contentText, styles.selectionTitle]}>Woke up at (this morning):</Text>
                    <TimeSelector style={styles.widgetBottomMargin} time={endTime} setTime={setEndTime} />
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
    selectionTitle: {
        marginBottom: 10
    },
    widgetBottomMargin: {
        marginBottom: 20
    },
});