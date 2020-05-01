import {createStackNavigator} from 'react-navigation-stack';
import About from '../screens/about';
import React from 'react';

const screens = {
    About: {
        screen: About,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header />,
                headerLeft: () => <HomeButton navigation={navigation} />   
                // headerStyle...
            }
        }
    },
}

const AboutStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#222', // color of the text
        headerStyle: {backgroundColor: '#ccc', height: 60}
    }
});

export default AboutStack;