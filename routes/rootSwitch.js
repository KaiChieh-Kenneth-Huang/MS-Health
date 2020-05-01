import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import HomeStack from './homeStack';
import DiaryStack from './diaryStack';
import ReportsStack from './reportsStack';
import MS_FriendsStack from './ms_friendsStack';
import GamesStack from './gamesStack';
import EducationStack from './educationStack';
import GoalsStack from './goalsStack';
import VitalsStack from './vitalsStack';
import EmergencyStack from './emergencyStack';

const RootStackNavigator = createSwitchNavigator({
    Home: {
        screen: HomeStack
    },
    Diary: {
        screen: DiaryStack
    },
    Reports: {
        screen: ReportsStack
    },
    MS_Friends: {
        screen: MS_FriendsStack
    },
    Games: {
        screen: GamesStack
    },
    Education: {
        screen: EducationStack
    },
    Goals: {
        screen: GoalsStack
    },
    Vitals: {
        screen: VitalsStack
    },
    Emergency: {
        screen: EmergencyStack
    }
});

export default createAppContainer(RootStackNavigator);