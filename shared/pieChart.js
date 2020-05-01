import React, {useState} from 'react';
import {StyleSheet, View, Button, FlatList, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import Svg, { Circle, G, Text } from 'react-native-svg';

export default function PieChart({ values1, colors1, offset1 = 0, values2 = null, colors2 = null, offset2 = 0, centerNum = null, centerText = null}){
    const RADIUS = 100;

    const ringWidth = values2 === null ? 20 : 10;

    // outer circumference including ring width is set to 100
    // the circumference below refers to the center of the ring, between the inner and outer parts of the ring
    const radius1 = 100 - ringWidth / 2;
    const radius2 = 100 - ringWidth / 2 * 3;

    let ring1 = [];
    let ring2 = [];

    CreateRing(ring1, values1, colors1, radius1, ringWidth, offset1);
    if(values2){
        CreateRing(ring2, values2, colors2, radius2, ringWidth, offset2);
    }
    

    function CreateRing (ring, values, colors, radius, width, offset = 0, centerFill = null) { // width extends equally on both sides of the radius
        const circumference = radius * 2 * Math.PI;
        const offsetLen = offset * circumference; // 0 = no offest, 1 = 360 deg offset

        var sum = 0;
        var valSums = [];


        for (const element of values) {
            sum += element;
            valSums.push(sum);
        }
    
        // convert cumulative values into corresponding arc length
        for(let i = 0; i < valSums.length; i++) {
            valSums[i] = valSums[i] / sum * circumference;
        }
    
        if(centerFill !== null) {
            ring.push(<Circle key={-1} cx={RADIUS} cy={RADIUS} r={radius} fill={centerFill} />);
        }
    
        // first segment
        ring.push(<Circle key={0} cx={RADIUS} cy={RADIUS} r={radius} fill="transparent" stroke={colors[0]} strokeWidth={width} strokeDashoffset={offsetLen}/>);
        // subsequent segments
        {
            let colorIterator = 1;
            for(let i = 1; i < values.length; i++) {
                if(colorIterator >= colors.length) {
                    colorIterator = 0;
                }
                ring.push(<Circle key={i} cx={RADIUS} cy={RADIUS} r={radius} fill="transparent" stroke={colors[colorIterator]} strokeWidth={width} strokeDasharray={[circumference-valSums[i - 1], valSums[i - 1]]} strokeDashoffset={offsetLen}/>);
                colorIterator ++;
            }
        }
    }

    return (
        <Svg width="100%" height="100%" viewBox={[0, 0, RADIUS * 2, RADIUS * 2]}>
            {ring1}
            {ring2}
            <G style={styles.chartText} translateY={10}>
                <Text style={styles.chartNumber} x={RADIUS} y={RADIUS} textAnchor="middle" fontSize={70 - centerNum.toString().length * 2} translateY={0}>
                    {centerNum}
                </Text>
                <Text style={styles.chartLabel} x={RADIUS} y={RADIUS} textAnchor="middle" fontSize={20} translateY={25}>
                    {centerText}
                </Text>
            </G>
        </Svg>
    )
}

const styles = StyleSheet.create({
    chartText: {
        
    },
    chartNumber: {

    },
    chartLabel: {

    },
});
