import {createStackNavigator} from 'react-navigation-stack';
import VitalsHome from '../screens/vitalsHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    VitalsHome: {
        screen: VitalsHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'VITALS',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const VitalsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default VitalsStack;