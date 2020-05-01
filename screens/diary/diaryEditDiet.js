import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage, KeyboardAvoidingView, Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {globalStyles} from '../../styles/global';
import DropDownSelector from '../../shared/inputComponents/dropDownSelector';
import TimeSelector from '../../shared/inputComponents/timeSelector';
import ValueSelector from '../../shared/inputComponents/valueSelector';
import CommentSection from '../../shared/inputComponents/commentSection';
import CtaButton from '../../shared/inputComponents/ctaButton';
import ListItemDisplay from '../../shared/listItemDisplay';

export default function DiaryEditDiet({ navigation }){
    const itemIndex = navigation.getParam('itemIndex');
    const date = navigation.getParam('date');
    const dateData = navigation.getParam('dateData');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const refreshDiaryDiet = navigation.getParam('refreshDiaryDiet');

    const DEFAULT_LIST = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    const foodList = [];

    const foods = dateData.diet === undefined ? [] :
        dateData.diet[itemIndex] === undefined ? [] : dateData.diet[itemIndex].foods;

    const [refreshToggle, setRefreshToggle] = useState(false);
    

    const [selectedItem, setSelectedItem] = useState(
        dateData.diet === undefined ? null :
        dateData.diet[itemIndex] === undefined ? null : dateData.diet[itemIndex].type
        );
    const [startTime, setStartTime] = useState( // time saved as minutes since 00:00 AM
        dateData.diet === undefined ? null :
        dateData.diet[itemIndex] === undefined ? null : dateData.diet[itemIndex].startTime
        ); 
    const [endTime, setEndTime] = useState( // time saved as minutes since 00:00 AM
        dateData.diet === undefined ? null :
        dateData.diet[itemIndex] === undefined ? null : dateData.diet[itemIndex].endTime
        ); 
    const [calorie, setCalorie] = useState(
        dateData.diet === undefined ? null :
        dateData.diet[itemIndex] === undefined ? null : dateData.diet[itemIndex].value
        ); 
    const [comment, setComment] = useState(
        dateData.diet === undefined ? null :
        dateData.diet[itemIndex] === undefined ? null : dateData.diet[itemIndex].comment
        ); 
    
    const saveAndReturn = async () => {
        try {
            await AsyncStorage.setItem(date.toDateString(), JSON.stringify(dateData));
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }

        refreshDiaryHome();
        refreshDiaryDiet();

        navigation.navigate('DiaryDiet');
    };

    const discardItem = () => {
        Alert.alert(
            'Delete Meal',
            'Are you sure you wish to remove this meal?',
            [
                {text: 'DELETE', onPress: () => {
                    if(dateData.diet === undefined){
                        dateData.diet = [];
                    }
            
                    dateData.diet.splice(itemIndex, 1);
            
                    saveAndReturn();
                }},
                {text: 'CANCEL', onPress: () => {}, style: 'cancel'}
            ],
            { cancelable: false }
        );
    };

    const setItem = () => {
        if(dateData.diet === undefined){
            dateData.diet = [];
        }
        dateData.diet[itemIndex] = {type: selectedItem, startTime: startTime, endTime: endTime, value: totalCalorie, comment: comment, foods: foods};
        dateData.diet.sort((a, b) => a.startTime - b.startTime);
        saveAndReturn();
    };

    // helper functions for foods list
    const refreshDiaryDietFood = () => {
        setRefreshToggle(!refreshToggle);
    }
    
    const editList = (index) => {
        // open edit list page
        // pass functions for discard and save buttons using itemIndex as an argument
        navigation.navigate('DiaryEditDietFood', {mealItemIndex: itemIndex, itemIndex: index, dateData: dateData, date: date, refreshDiaryHome: refreshDiaryHome, refreshDiaryDiet: refreshDiaryDiet, refreshDiaryDietFood: refreshDiaryDietFood});
    }

    let totalCalorie = 0;
    for(let i=0; i<foods.length; i++){
        foodList.push({
            leftText: foods[i].calorie + ' Cal',
            rightText: foods[i].type,
            key: i
        });
        totalCalorie += foods[i].calorie;
    }

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
                    listItemName='meal'
                    listName={'mealList'} 
                    defaultList = {DEFAULT_LIST}
                    initialSelection={selectedItem} 
                    onSelect={(selection) => {setSelectedItem(selection);}}
                    />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Start Time</Text>
                <TimeSelector style={styles.timeSelectorMargin} time={startTime} setTime={setStartTime} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>End Time</Text>
                <TimeSelector style={styles.timeSelectorMargin} time={endTime} setTime={setEndTime} />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>List of Foods</Text>
                <Text style={[globalStyles.contentText, styles.totalCalorie]}>TOTAL: {totalCalorie} Cal</Text>
                <ListItemDisplay prompt='' listItemName='Food' list={foodList} color={{regular: globalStyles.diaryColor.color, select: globalStyles.diarySelectColor.color}} editList={editList} />
                {/* <ValueSelector style={styles.intensityMargin} highValueText='Intense' lowValueText='Mild' value={intensity} lowValue={1} highValue={5} setValue={setIntensity} /> */}
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
    },
    totalCalorie: {
        marginBottom: 10,
        textAlign: 'center',
        color: globalStyles.diaryColor.color,
    }

});