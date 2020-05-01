import {createStackNavigator} from 'react-navigation-stack';
import DiaryHome from '../screens/diaryHome';
import DiaryMood from '../screens/diary/diaryMood';
import DiaryEnergy from '../screens/diary/diaryEnergy';
import DiarySymptoms from '../screens/diary/diarySymptoms';
import DiaryEditSymptom from '../screens/diary/diaryEditSymptom';
import DiaryActivity from '../screens/diary/diaryActivity';
import DiaryEditActivity from '../screens/diary/diaryEditActivity';
import DiarySleep from '../screens/diary/diarySleep';
import DiaryDiet from '../screens/diary/diaryDiet';
import DiaryEditDiet from '../screens/diary/diaryEditDiet';
import DiaryEditDietFood from '../screens/diary/diaryEditDietFood';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    DiaryHome: {
        screen: DiaryHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryMood: {
        screen: DiaryMood,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - MOOD',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryEnergy: {
        screen: DiaryEnergy,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - ENERGY',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiarySymptoms: {
        screen: DiarySymptoms,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - SYMPTOMS',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryEditSymptom: {
        screen: DiaryEditSymptom,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - SYMPTOMS',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryActivity: {
        screen: DiaryActivity,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - ACTIVITY',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryEditActivity: {
        screen: DiaryEditActivity,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - ACTIVITY',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiarySleep: {
        screen: DiarySleep,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - SLEEP',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryDiet: {
        screen: DiaryDiet,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - DIET',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryEditDiet: {
        screen: DiaryEditDiet,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - DIET - MEAL',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    DiaryEditDietFood: {
        screen: DiaryEditDietFood,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'DIARY - DIET - MEAL',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const DiaryStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default DiaryStack;