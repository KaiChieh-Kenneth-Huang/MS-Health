import {createStackNavigator} from 'react-navigation-stack';
import Ms_friendsHome from '../screens/ms_friendsHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    Ms_friendsHome: {
        screen: Ms_friendsHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'MS_FRIENDS',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const Ms_friendsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default Ms_friendsStack;