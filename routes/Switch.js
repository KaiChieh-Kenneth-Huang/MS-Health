import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import HomeStack from './homeStack';
//import AboutStack from './aboutStack';

const RootStackNavigator = createSwitchNavigator({
    Home: {
        screen: HomeStack
    },
    // About: {
    //     screen: AboutStack
    // }
});

export default createAppContainer(RootStackNavigator);