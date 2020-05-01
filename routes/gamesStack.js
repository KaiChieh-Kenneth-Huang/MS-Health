import {createStackNavigator} from 'react-navigation-stack';
import GamesHome from '../screens/gamesHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    GamesHome: {
        screen: GamesHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'GAME',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const GamesStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default GamesStack;