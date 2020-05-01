import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../styles/global';

export default function HorizontalSelector({values, selectedValue, width, color, selectedFillColor, operationFunc}) {
    var jsxArr = [];
    const [selectedVal, setSelectedVal] = useState(selectedValue);
    

    for(let i = 0; i < values.length; i++) {
        let fillColor = selectedVal === values[i] ? selectedFillColor : null;

        jsxArr.push(
            <TouchableOpacity
                key={i}
                style={[styles.buttonStyle, {borderColor: color, width: width, backgroundColor: fillColor}]}
                onPress={() => {
                    setSelectedVal(values[i]);
                    operationFunc(values[i]);
                }}
            >
                <Text style={[styles.buttonText, {color: color}]}>{values[i]}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {jsxArr}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    buttonStyle: {
        paddingVertical: 10,
        backgroundColor: 'transparent',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'roboto-regular',
    }
});