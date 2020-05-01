import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {globalStyles} from '../../styles/global';

export default function TimeSelector({style, time, setTime}) {
    const timeNow = new Date(Date.now());
    const [hr, setHr] = useState(null);
    const [min, setMin] = useState(null);
    const [prevHr, setPrevHr] = useState(null);
    const [prevMin, setPrevMin] = useState(null);
    const [isAM, setIsAM] = useState(null);

    const setTimeForParentPage = (hour, minute, isAm) => {
        setTime(parseInt(hour) * 60 + parseInt(minute) + (isAm ? 0 : (hour === '12' ? 0 : 12 * 60)));
    }

    const toggleAmPm = () => {
        if(isAM) {
            if(hr === '00'){
                setHr('12');
                setTimeForParentPage('12', min, !isAM);
            }else{
                setTimeForParentPage(hr, min, !isAM);
            }
        }else{
            if(hr === '12'){
                setHr('00');
                setTimeForParentPage('00', min, !isAM);
            }else{
                setTimeForParentPage(hr, min, !isAM);
            }
        }
        setIsAM(!isAM);
    }

    const getStr = (input, max) => {
        let num = parseInt(input, 10);

        if(num >= 0 && num <= max) {
            let val = num < 10 ? '0' + num.toString() : num.toString();
            return val;
        } else {
            return null;
        }
    };
 
    const checkNum = (input, max) => {
        let num = parseInt(input, 10);

        if(num >= 0 && num <= max) {
            return true;
        } else {
            return false;
        }
    }

    if(hr === null || min === null){
        let hour = null;
        let minute = null;

        let hrStr = null;
        let minStr = null;

        if(time === null || time === undefined){
            hour = timeNow.getHours();
            minute = timeNow.getMinutes();
        }else{
            hour = Math.floor(time / 60);
            minute = time % 60;
        }

        if(hour > 23) {
            hour = 23;
            minute = 59;
        }

        if(hour >= 12){
            setIsAM(false);
        }else {
            setIsAM(true);
        }
        hrStr = hour > 12 ? getStr((hour - 12).toString(), 12) : getStr(hour.toString(), 12);
        minStr = getStr( minute.toString(), 59);

        setHr(hrStr);
        setPrevHr(hrStr);
        setMin(minStr);
        setPrevMin(minStr);
        setIsAM(hour < 12 ? true : false);
    }else{
        setTimeForParentPage(hr, min, isAM);
    }
    

    return (
        <View style={style}>
            <View style={styles.container}>
                <TextInput
                    style={ [styles.userInput, globalStyles.contentText] }
                    onChangeText={text => setHr(text)}
                    onEndEditing={() => {
                        if(checkNum(hr, 12)){
                            let newHr = getStr(hr, 12);

                            // fix the problem that there's no 12AM and 00PM
                            if(newHr === '00' && !isAM){
                                setIsAM(true);
                            }else if(newHr === '12' && isAM){
                                setIsAM(false);
                            }
                            setPrevHr(newHr);
                            setHr(newHr);
                            setTimeForParentPage(newHr, min, isAM);
                        } else {
                            setHr(prevHr);
                        }
                    }}
                    value={hr}
                    keyboardType={'numeric'}
                />
                <Text style={ [globalStyles.contentText, styles.colon] }>:</Text>
                <TextInput
                    style={ [styles.userInput, globalStyles.contentText] }
                    onChangeText={text => setMin(text)}
                    onEndEditing={() => {
                        if(checkNum(min, 59)){
                            let newMin = getStr(min, 59);
                            setPrevMin(newMin);
                            setMin(newMin);
                            setTimeForParentPage(hr, newMin, isAM);
                        } else {
                            setMin(prevMin);
                        }
                    }}
                    value={min}
                    keyboardType={'numeric'}
                />
                <TouchableOpacity
                    style={[styles.userInput, styles.ampmBox]}
                    onPress={ toggleAmPm }
                >
                    <Text style={[globalStyles.contentText, {textAlign: 'center'}]}>{isAM ? 'AM' : 'PM'}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    colon: {
        marginHorizontal: 10
    },
    userInput: {
        paddingVertical: 15,
        width: 70,
        borderColor: '#BBB', 
        borderWidth: 1,
        textAlign: 'center'
    },
    ampmBox: {
        marginLeft: 20,
    }
});