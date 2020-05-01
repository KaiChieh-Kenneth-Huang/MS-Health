import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../styles/global';
import BackButton from '../shared/backButton';
import NextButton from '../shared/nextButton';
import {MaterialIcons, FontAwesome, SimpleLineIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateSelector from '../shared/inputComponents/dateSelector';

export default function DiaryHome({ navigation }){
    const [date, setDate] = useState(new Date(Date.now()));
    const [dateData, setDateData] = useState(undefined);

    const iconSize = 54;
    const navOptions = [
        {screenName: 'DiaryMood', text: 'Mood', propName: 'mood', icon: <MaterialIcons name='mood' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '1'},
        {screenName: 'DiaryEnergy', text: 'Energy', propName: 'energy', icon: <SimpleLineIcons name='energy' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '2'},
        {screenName: 'DiarySymptoms', text: 'Symptoms', propName: 'symptoms', icon: <FontAwesome name='heartbeat' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '3'},
        {screenName: 'DiaryActivity', text: 'Activity', propName: 'activity', icon: <FontAwesome name='soccer-ball-o' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '4'},
        {screenName: 'DiarySleep', text: 'Sleep', propName: 'sleep', icon: <FontAwesome name='bed' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '5'},
        {screenName: 'DiaryDiet', text: 'Diet', propName: 'diet', icon: <MaterialCommunityIcons name='food-variant' size={iconSize} style={[globalStyles.optionIcon, globalStyles.diaryColor]}/>, key: '6'}
    ];

    let optionList = [];
    let nextScreenFunc = undefined;

    // this should be called whenever new information is saved to asyncStorage
    const refreshDiaryHome = () => {
        loadDateData();
    }

    const dateChanger = (event, selectedDate) => {
        setDate(selectedDate);
    };

    const loadDateData = async (newDate = null) => {
        const dateToGet = newDate === null ? date : newDate;
        try {
            const data = await AsyncStorage.getItem(dateToGet.toDateString());
            
            if (data !== null) {
                // We have data!!
                setDateData(JSON.parse(data));
            } else {
                setDateData({});
            }
        } catch (e) {
        // Error retrieving data
            setDateData({});
            console.log('error retrieving data.');
        }
    };

    if(dateData === undefined) {
        loadDateData();
    }else{
        for(let i=0; i<navOptions.length; i++){
            let bkgColor = 'transparent';
            let itemObj = dateData[navOptions[i].propName];
            if(itemObj){
                if(Array.isArray(itemObj)){
                    if(itemObj.length > 0){
                        bkgColor = globalStyles.diarySelectColor.color;
                    }
                }else{
                    if(itemObj.type){
                        bkgColor = globalStyles.diarySelectColor.color;
                    }
                    if(itemObj.value){
                        bkgColor = globalStyles.diarySelectColor.color;
                    }
                }
            }
    
            // determine where to go when the next screen button is pressed
            if (nextScreenFunc === undefined && bkgColor === 'transparent') {
                nextScreenFunc = () => {
                    navigation.navigate(navOptions[i].screenName, {prevScreen: 'DiaryHome', date: date, dateData: dateData, refreshDiaryHome: refreshDiaryHome});
                }
            }
            optionList.push(
                <TouchableOpacity
                    key={navOptions[i].key}
                    style={[globalStyles.options,
                    {
                        marginTop: i === 0 ? 20 : 0,
                        backgroundColor: bkgColor,
                        borderColor: globalStyles.diaryColor.color,
                    }]}
                    onPress={() => navigation.navigate(navOptions[i].screenName, {prevScreen: 'DiaryHome', date: date, dateData: dateData, refreshDiaryHome: refreshDiaryHome})}
                >
                    {navOptions[i].icon}
                    <Text style={[globalStyles.menuText, globalStyles.diaryColor]}>{navOptions[i].text}</Text>
                </TouchableOpacity>
            );
        }
    }
    
    

    if (nextScreenFunc === undefined) {
        nextScreenFunc = () => {
            navigation.navigate('Home');
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.dateSection}>
                <DateSelector iconColor={globalStyles.diaryColor.color} value={date} dateSetter={(newDate) => {
                    setDate(newDate);
                }}
                doneAction={() => {
                    loadDateData();
                }}/>
                {/* <TouchableOpacity onPress={openDateNavigator} style={styles.dateContainer}>
                    <MaterialCommunityIcons name='calendar-edit' size={30} style={[styles.calendarIcon, globalStyles.diaryColor]} />
                    <Text style={styles.dateText}> {NumToMonth(date.getMonth())} / {date.getDate()} / {date.getFullYear()} </Text>
                </TouchableOpacity> */}
            </View>
            
            <View style={globalStyles.contentContainerBN}>
                <ScrollView>
                    {optionList}
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
    dateSection: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
        // shadowColor: '#000',
        // elevation: 6,
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.4,
        // shadowRadius: 7.5,
    },
    dateContainer: {
        borderColor: '#ddd',
        borderWidth: 2,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarIcon: {
    },
    dateText:{
        fontSize: 24,
        fontFamily: 'roboto-bold',
        color: '#333',
    },
    dateNavigatorContainer: {
        top: '20%',
    },
    buttonContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: '#b65',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        borderRadius: 5,
        fontSize: 24,
        color: '#eee',
        fontFamily: 'roboto-bold'
    },
});