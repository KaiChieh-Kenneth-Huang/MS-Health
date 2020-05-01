import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    headerTintColor: {
        color: '#222',
    },
    diaryColor: {
        color: '#282',
    },
    diarySelectColor: {
        color: '#2825',
    },
    reportColor: {
        color: '#339',
    },
    reportSelectColor: {
        color: '#3395',
    },
    headerStyle: {
        backgroundColor: '#ccc',
        height: 60,
    },
    container: {
        flex: 1
    },
    contentContainerBN: {
        paddingHorizontal: 20,
        //paddingBottom: 60,
        flex: 1
    },
    options: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    titleText: {
        fontFamily: 'roboto-bold',
        fontSize: 30,
        color: '#333'
    },
    menuText: {
        fontFamily: 'roboto-regular',
        fontSize: 24,
        color: '#eee'
    },
    subtitleText: {
        fontFamily: 'roboto-regular',
        fontSize: 24,
    },
    contentText: {
        fontFamily: 'roboto-regular',
        fontSize: 20,
    },
    menuIcon: {
        color: '#eee',
        height: 72,
    },
    optionIcon: {
        color: '#eee',
        height: 54,
    },
    paragraph: {
        marginVertical: 8,
        lineHeight: 20,
    },
    backNextBtnContainer: {
        height: 60,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 7.5,
    },
    backNextButton: {
        position: 'absolute',
        bottom: 0,
        // backgroundColor: 'rgba(200, 180, 150, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        height: 60,
    },
    backNextText: {
        fontFamily: 'roboto-regular',
        fontSize: 24,
        color: '#333'
    },
    backNextButtonIcon: {
        paddingHorizontal: 20,
    },
    prompt: {
        fontFamily: 'roboto-regular',
        fontSize: 24,
        marginVertical: 20,
    }
});