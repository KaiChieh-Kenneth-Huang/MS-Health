import {createStackNavigator} from 'react-navigation-stack';
import GoalsHome from '../screens/goalsHome';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    GoalsHome: {
        screen: GoalsHome,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'GOALS',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
}

const GoalsStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

export default GoalsStack;