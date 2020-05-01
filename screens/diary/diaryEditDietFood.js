import React, {useState} from 'react';
import {StyleSheet, View,Text, Modal, TouchableOpacity, ScrollView, AsyncStorage, Alert, TextInput} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {globalStyles} from '../../styles/global';
import DropDownSelector from '../../shared/inputComponents/dropDownSelector';
import TimeSelector from '../../shared/inputComponents/timeSelector';
import ValueSelector from '../../shared/inputComponents/valueSelector';
import CommentSection from '../../shared/inputComponents/commentSection';
import CtaButton from '../../shared/inputComponents/ctaButton';

export default function DiaryEditDietFood({ navigation }){
    const mealItemIndex = navigation.getParam('mealItemIndex');
    const itemIndex = navigation.getParam('itemIndex');
    const date = navigation.getParam('date');
    const dateData = navigation.getParam('dateData');
    const refreshDiaryHome = navigation.getParam('refreshDiaryHome');
    const refreshDiaryDiet = navigation.getParam('refreshDiaryDiet');
    const refreshDiaryDietFood = navigation.getParam('refreshDiaryDietFood');

    const [foodSettings, setFoodSettings] = useState(null);

    const DEFAULT_LIST = ['Bread', 'Cereal', 'Egg', 'Mashed Potato', 'Spaghetti'];

    const [selectedItem, setSelectedItem] = useState(
        dateData.diet === undefined ? null :
        dateData.diet[mealItemIndex] === undefined ? null :
        dateData.diet[mealItemIndex].foods[itemIndex] === undefined ? null : dateData.diet[mealItemIndex].foods[itemIndex].type
        );
    const savedCalorie = 
        dateData.diet === undefined ? null :
        dateData.diet[mealItemIndex] === undefined ? null :
        dateData.diet[mealItemIndex].foods[itemIndex] === undefined ? null : dateData.diet[mealItemIndex].foods[itemIndex].calorie;

    const [cps, setCps] = useState(0); // calories per serving
    const [servings, setServings] = useState(0);
    
    const saveAndReturn = async () => {
        try {
            await AsyncStorage.setItem(date.toDateString(), JSON.stringify(dateData));
        } catch (e) {
            // saving error
            console.log("error saving diary data to AsyncStorage");
        }

        if(foodSettings){
            try {
                await AsyncStorage.setItem('foodSettings', JSON.stringify(foodSettings));
            } catch (e) {
                // saving error
                console.log("error saving food Settings to AsyncStorage");
            }
        }

        refreshDiaryDietFood();

        navigation.navigate('DiaryEditDiet');
    };

    const discardItem = () => {
        Alert.alert(
            'Delete Food',
            'Are you sure you wish to remove this food?',
            [
                {text: 'DELETE', onPress: () => {
                    if(dateData.diet === undefined){
                        dateData.diet = [];
                    }
                    
                    if(dateData.diet[mealItemIndex] === undefined){
                        dateData.diet[mealItemIndex] = {foods: []}
                    }
            
                    dateData.diet[mealItemIndex].foods.splice(itemIndex, 1);
            
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

        if(dateData.diet[mealItemIndex] === undefined){
            dateData.diet[mealItemIndex] = {foods: []}
        }

        dateData.diet[mealItemIndex].foods[itemIndex] = {type: selectedItem, calorie: (cps * servings)};
        // update the food settings as well
        if(foodSettings){
            foodSettings[selectedItem] = {cps: cps, servings: servings};
        }
        
        saveAndReturn();
    };

    const loadFoodSettings = async () => {
        try {
            const data = await AsyncStorage.getItem('foodSettings');
            const settings = JSON.parse(data);
            if (data !== null) {
                // We have data!!
                setFoodSettings(settings);
                if(settings !== null && selectedItem !== null){
                    if(settings[selectedItem]){
                        setCps(settings[selectedItem].cps);
                        if(savedCalorie){
                            setServings(savedCalorie / settings[selectedItem].cps);
                        }else{
                            setServings(settings[selectedItem].servings);
                        }
                    }
                }
            } else {
                setFoodSettings({});
            }
        } catch (e) {
            // Error retrieving data
            console.log('Error retrieving saved calories per serving for food.');
        }
    };

    if(foodSettings === null){
        loadFoodSettings();
    }

    let totalCalories = cps * servings;
    if(typeof (totalCalories) !== 'number' || isNaN(totalCalories)){
        totalCalories = '';
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
                    listItemName='food'
                    listName={'foodList'} 
                    defaultList = {DEFAULT_LIST}
                    initialSelection={selectedItem} 
                    onSelect={(selection) => {
                        setSelectedItem(selection);
                        if(foodSettings !== null && selection !== null){
                            if(foodSettings[selection]){
                                setCps(foodSettings[selection].cps);
                                setServings(foodSettings[selection].servings);
                            }
                        }
                    }}
                    />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Calories per Serving</Text>
                <TextInput
                    style={ [styles.userInput, globalStyles.contentText] }
                    clearTextOnFocus={true}
                    onFocus={() => {
                        setCps('');
                    }}
                    onChangeText={text => setCps(text)}
                    onEndEditing={() => {
                        let num = parseFloat(cps);
                        if(typeof num !== 'number' || isNaN(num)){
                            num = 0;
                        }
                        setCps(num);
                    }}
                    value={cps.toString()}
                    keyboardType={'numeric'}
                />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Servings</Text>
                <TextInput
                    style={ [styles.userInput, globalStyles.contentText] }
                    clearTextOnFocus={true}
                    onFocus={() => {
                        setServings('');
                    }}
                    onChangeText={text => setServings(text)}
                    onEndEditing={() => {
                        let num = parseFloat(servings);
                        if(typeof num !== 'number' || isNaN(num)){
                            num = 0;
                        }
                        setServings(num);
                    }}
                    value={servings.toString()}
                    keyboardType={'numeric'}
                />
                <Text style={[globalStyles.contentText, styles.selectionTitle]}>Total Calories: {totalCalories}</Text>
                
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
    userInput: {
        paddingVertical: 15,
        width: 70,
        borderColor: '#BBB', 
        borderWidth: 1,
        textAlign: 'center',
        marginBottom: 20
    },

});