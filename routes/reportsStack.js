import {createStackNavigator} from 'react-navigation-stack';
import ReportsHome from '../screens/reportsHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    ReportsHome: {
        screen: ReportsHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'REPORTS',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const ReportsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default ReportsStack;