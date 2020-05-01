import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import {Ionicons} from '@expo/vector-icons';

export default function OptionSelector({ prompt, listItemName, list, color, editList}) {
    let btnList = [];

    for(let i=0; i<list.length; i++){
        btnList.push(
            <TouchableOpacity
                key={list[i].key}
                style={[
                    globalStyles.options,
                    {
                        borderColor: color.regular,
                    }]}
                onPress={ () =>  {
                    editList(i);
                }}
            >
                <View style={[styles.leftContainer, {backgroundColor: color.regular}]}>
                    <Text style={styles.leftText}>{list[i].leftText}</Text>
                </View>
                
                <Text style={[styles.rightText, {color: color.regular}]}>{list[i].rightText}</Text>
            </TouchableOpacity>
        );
    }

    let promptDisplay = prompt ? <Text style={globalStyles.prompt}>{prompt}</Text> : null;
    // append add list item option at the end of list
    btnList.push(
        <TouchableOpacity
            key={'add'}
            style={[
                globalStyles.options,
                {
                    borderColor: color.select,
                }
            ]}
            onPress={ () =>  {
                editList(list.length);
            }}>
            <Ionicons name='ios-add-circle-outline' size={54} style={[globalStyles.optionIcon, globalStyles.diarySelectColor]}/>
            <Text style={[globalStyles.menuText, {color: color.select}]}>{'Add ' + listItemName}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            {promptDisplay}
            {btnList}
        </View>
        
    );
}

const styles = StyleSheet.create({
    leftContainer: {
        position: 'absolute',
        left: 0,
        width: 100,
        alignItems: 'center',
    },
    leftText: {
        fontSize: 18,
        color: '#eee'
    },
    rightText: {
        fontSize: 24,
        marginLeft: 100,
    },
});