import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {globalStyles} from '../../styles/global';
import DropDownSelector from '../../shared/inputComponents/dropDownSelector';
import TimeSelector from '../../shared/inputComponents/timeSelector';
import ValueSelector from '../../shared/inputComponents/valueSelector';
import CommentSection from '../../shared/inputComponents/commentSection';
import CtaButton from '../../shared/inputComponents/ctaButton';

export default function DiaryEditActivity({ navigation }){
    const itemIndex = navigation.getParam('itemIndex');
    const date = navigation.getParam('date');
    const dateData = navigation.getParam('dateData');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const refreshDiaryActivity = navigation.getParam('refreshDiaryActivity');

    const DEFAULT_LIST = ['Gardening', 'Hiking', 'Jogging', 'Swimming', 'Walking'];

    const [selectedItem, setSelectedItem] = useState(
        dateData.activity === undefined ? null :
        dateData.activity[itemIndex] === undefined ? null : dateData.activity[itemIndex].type
        );
    const [startTime, setStartTime] = useState( // time saved as minutes since 00:00 AM
        dateData.activity === undefined ? null :
        dateData.activity[itemIndex] === undefined ? null : dateData.activity[itemIndex].startTime
        ); 
    const [endTime, setEndTime] = useState( // time saved as minutes since 00:00 AM
        dateData.activity === undefined ? null :
        dateData.activity[itemIndex] === undefined ? null : dateData.activity[itemIndex].endTime
        ); 
    const [intensity, setIntensity] = useState(
        dateData.activity === undefined ? null :
        dateData.activity[itemIndex] === undefined ? null : dateData.activity[itemIndex].value
        ); 
    const [comment, setComment] = useState(
        dateData.activity === undefined ? null :
        dateData.activity[itemIndex] === undefined ? null : dateData.activity[itemIndex].comment
        ); 
    
    const saveAndReturn = async () => {
        try {
            await AsyncStorage.setItem(date.toDateString(), JSON.stringify(dateData));
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }

        refreshDiaryHome();
        refreshDiaryActivity();

        navigation.navigate('DiaryActivity');
    };

    const discardItem = () => {
        Alert.alert(
            'Delete Activity',
            'Are you sure you wish to remove this activity?',
            [
                {text: 'DELETE', onPress: () => {
                    if(dateData.activity === undefined){
                        dateData.activity = [];
                    }
            
                    dateData.activity.splice(itemIndex, 1);
            
                    saveAndReturn();
                }},
                {text: 'CANCEL', onPress: () => {}, style: 'cancel'}
            ],
            { cancelable: false }
        );
    };

    const setItem = () => {
        if(dateData.activity === undefined){
            dateData.activity = [];
        }
        dateData.activity[itemIndex] = {type: selectedItem, startTime: startTime, endTime: endTime, value: intensity, comment: comment};
        dateData.activity.sort((a, b) => a.startTime - b.startTime);
        saveAndReturn();
    };

    return (
        <View style={globalStyles.container}>
            <KeyboardAwareScrollView
                style={styles.contentContainer}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.contentContainer}
            >
            {/* <ScrollView style={styles.contentContainer}> */}
                <DropDownSelector 
                    style={styles.dropdownMargin} 
                    listItemName='activity'
                    listName={'activityList'} 
                    defaultList = {DEFAULT_LIST}
                    initialSelection={selectedItem} 
                    onSelect={(selection) => {setSelectedItem(selection);}}
                    />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Start Time</Text>
                <TimeSelector style={styles.timeSelectorMargin} time={startTime} setTime={setStartTime} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>End Time</Text>
                <TimeSelector style={styles.timeSelectorMargin} time={endTime} setTime={setEndTime} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Intensity</Text>
                <ValueSelector style={styles.intensityMargin} highValueText='Intense' lowValueText='Mild' value={intensity} lowValue={1} highValue={5} setValue={setIntensity} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Comments</Text>
                
                <CommentSection
                    comment={comment}
                    setComment={setComment}
                />
                
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20}}>
                    <CtaButton value={'DISCARD'} style={{backgroundColor: '#A33'}} operationFunc={discardItem}/>
                    <CtaButton value={'SAVE'} operationFunc={setItem}/>
                </View>
            {/* </ScrollView> */}
            </KeyboardAwareScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20
    },
    dropdownMargin: {
        marginBottom: 20
    },
    timeSelectorMargin: {
        marginBottom: 20
    },
    intensityMargin: {
        marginBottom: 20
    },
    selectionTitle: {
        marginBottom: 10
    }

});