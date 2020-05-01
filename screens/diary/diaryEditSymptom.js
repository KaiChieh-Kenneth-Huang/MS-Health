import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {globalStyles} from '../../styles/global';
import DropDownSelector from '../../shared/inputComponents/dropDownSelector';
import TimeSelector from '../../shared/inputComponents/timeSelector';
import ValueSelector from '../../shared/inputComponents/valueSelector';
import CommentSection from '../../shared/inputComponents/commentSection';
import CtaButton from '../../shared/inputComponents/ctaButton';

export default function DiaryEditSymptom({ navigation }){
    const itemIndex = navigation.getParam('itemIndex');
    const date = navigation.getParam('date');
    const dateData = navigation.getParam('dateData');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const refreshDiarySymptoms = navigation.getParam('refreshDiarySymptoms');

    const DEFAULT_LIST = ['Dizziness', 'Drowsiness', 'Nausia', 'Numbness'];

    const [selectedItem, setSelectedItem] = useState(
        dateData.symptoms === undefined ? null :
        dateData.symptoms[itemIndex] === undefined ? null : dateData.symptoms[itemIndex].type
        );
    const [startTime, setStartTime] = useState( // time saved as minutes since 00:00 AM
        dateData.symptoms === undefined ? null :
        dateData.symptoms[itemIndex] === undefined ? null : dateData.symptoms[itemIndex].startTime
        ); 
    const [endTime, setEndTime] = useState( // time saved as minutes since 00:00 AM
        dateData.symptoms === undefined ? null :
        dateData.symptoms[itemIndex] === undefined ? null : dateData.symptoms[itemIndex].endTime
        ); 
    const [severity, setSeverity] = useState(
        dateData.symptoms === undefined ? null :
        dateData.symptoms[itemIndex] === undefined ? null : dateData.symptoms[itemIndex].value
        ); 
    const [comment, setComment] = useState(
        dateData.symptoms === undefined ? null :
        dateData.symptoms[itemIndex] === undefined ? null : dateData.symptoms[itemIndex].comment
        ); 
    
    const saveAndReturn = async () => {
        try {
            await AsyncStorage.setItem(date.toDateString(), JSON.stringify(dateData));
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }

        refreshDiaryHome();
        refreshDiarySymptoms();

        navigation.navigate('DiarySymptoms');
    };

    const discardItem = () => {
        Alert.alert(
            'Delete Symptom',
            'Are you sure you wish to remove this symptom?',
            [
                {text: 'DELETE', onPress: () => {
                    if(dateData.symptoms === undefined){
                        dateData.symptoms = [];
                    }
            
                    dateData.symptoms.splice(itemIndex, 1);
            
                    saveAndReturn();
                }},
                {text: 'CANCEL', onPress: () => {}, style: 'cancel'}
            ],
            { cancelable: false }
        );
    };

    const setItem = () => {
        if(dateData.symptoms === undefined){
            dateData.symptoms = [];
        }
        dateData.symptoms[itemIndex] = {type: selectedItem, startTime: startTime, endTime: endTime, value: severity, comment: comment};
        dateData.symptoms.sort((a, b) => a.startTime - b.startTime);
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
                    listItemName='symptom'
                    listName={'symptomList'} 
                    defaultList = {DEFAULT_LIST}
                    initialSelection={selectedItem} 
                    onSelect={(selection) => {setSelectedItem(selection);}}
                    />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Start Time</Text>
                <TimeSelector style={styles.timeSelectorMargin} time={startTime} setTime={setStartTime} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>End Time</Text>
                <TimeSelector style={styles.timeSelectorMargin} time={endTime} setTime={setEndTime} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Severity</Text>
                <ValueSelector style={styles.severityMargin} highValueText='Severe' lowValueText='Mild' value={severity} lowValue={1} highValue={5} setValue={setSeverity} />
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
    severityMargin: {
        marginBottom: 20
    },
    selectionTitle: {
        marginBottom: 10
    }

});