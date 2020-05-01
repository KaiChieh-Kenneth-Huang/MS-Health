import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Settings from '../screens/settings';
import Header from '../shared/header';
import HomeButton from '../shared/homeButton';
import ProfileButton from '../shared/profileButton';
import SettingsButton from '../shared/settingsButton';
import React from 'react';
import {globalStyles} from '../styles/global';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation}) => {
            return {
                title: 'HOME',
                headerLeft: () => <ProfileButton navigation={navigation} />,
                headerRight: () => <SettingsButton navigation={navigation} /> 
                // headerStyle...
            }
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'PROFILE',
                headerLeft: () => <HomeButton navigation={navigation}/>   
            }
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }) => {
            return {
                title: 'SETTINGS',
                headerLeft: () => <HomeButton navigation={navigation} />   
            }
        }
    },
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: globalStyles.headerTintColor.color, // color of the text
        headerStyle: globalStyles.headerStyle
    }
});

//export default createAppContainer(HomeStack);
export default HomeStack;