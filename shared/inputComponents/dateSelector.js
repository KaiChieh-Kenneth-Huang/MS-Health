import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput} from 'react-native';
import {globalStyles} from '../../styles/global';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import CtaButton from '../../shared/inputComponents/ctaButton';

export default function DateSelector({style, value, iconColor, dateSetter, doneAction = () => {}}) {
    //const [date, setDate] = useState(value);
    const [modalVisible, setModalVisible] = useState(false);

    const openDateNavigator = () => {
        setModalVisible(true);
    };
    
    const dateChanger = (event, selectedDate) => {
        //setDate(selectedDate);
        dateSetter(selectedDate);
    };

    function NumToMonth (num) {
        switch(num) {
            case 0:
                return 'JAN';
                break;
            case 1:
                return 'FEB';
                break;
            case 2:
                return 'MAR';
                break;
            case 3:
                return 'APR';
                break;
            case 4:
                return 'MAY';
                break;
            case 5:
                return 'JUN';
                break;
            case 6:
                return 'JUL';
                break;
            case 7:
                return 'AUG';
                break;
            case 8:
                return 'SEP';
                break;
            case 9:
                return 'OCT';
                break;
            case 10:
                return 'NOV';
                break;
            case 11:
                return 'DEC';
                break;
            default:
                return num;
        }
    }

    return (
        <View style={style}>
            <TouchableOpacity onPress={openDateNavigator} style={styles.dateContainer}>
                <MaterialCommunityIcons name='calendar-edit' size={30} style={[styles.calendarIcon, {color: iconColor}]} />
                <Text style={styles.dateText}> {NumToMonth(value.getMonth())} / {value.getDate()} / {value.getFullYear()} </Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                }}>           
                <View style={styles.dateNavigatorContainer}>
                    <DateTimePicker
                        style={styles.dateNavigator}
                        value={value}
                        maximumDate={new Date(Date.now())}
                        minimumDate={new Date(2020, 0, 1)}
                        mode='date'
                        onChange={dateChanger}
                    />

                    

                    <View style={styles.buttonContainer}>
                        <CtaButton value={'DONE'} operationFunc={ () => {
                            setModalVisible(false);
                            doneAction();
                            // dateSetter(date);
                        }}/>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    dateContainer: {
        borderColor: '#ddd',
        borderWidth: 2,
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        shadowColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText:{
        fontSize: 24,
        fontFamily: 'roboto-bold',
        color: '#333',
    },
    dateNavigatorContainer: {
        top: '20%',
    },
    dateNavigator: {

    },
    buttonContainer:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});