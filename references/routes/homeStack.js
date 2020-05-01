import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import ReviewDetails from '../screens/reviewDetails';
import Header from '../shared/header';
import HomeButton from '../shared/homeButton';
import React from 'react';

const screens = {
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header />,
                headerLeft: () => <HomeButton navigation={navigation} />   
                // headerStyle...
            }
        }
    },
    ReviewDetails: {
        screen: ReviewDetails,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header />,
                headerLeft: () => <HomeButton navigation={navigation} />   
            }
        }
    }
}

const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#222', // color of the text
        headerStyle: {backgroundColor: '#ccc', height: 60}
    }
});

//export default createAppContainer(HomeStack);
export default HomeStack;