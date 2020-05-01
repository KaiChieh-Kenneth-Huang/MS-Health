import {createStackNavigator} from 'react-navigation-stack';
import EducationHome from '../screens/educationHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    EducationHome: {
        screen: EducationHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'EDUCATION',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const EducationStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default EducationStack;