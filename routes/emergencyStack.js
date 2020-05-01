import {createStackNavigator} from 'react-navigation-stack';
import EmergencyHome from '../screens/emergencyHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    EmergencyHome: {
        screen: EmergencyHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'EMERGENCY',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const EmergencyStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default EmergencyStack;