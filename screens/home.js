import React, {useState} from 'react';
import {StyleSheet, View,Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {Foundation, FontAwesome} from '@expo/vector-icons';
import {globalStyles} from '../styles/global';

export default function Home({ navigation }){
    const iconSize = 72;
    const navOptions = [
        {screenName: 'DiaryHome', text: 'Diary', backgroundColor: globalStyles.diaryColor.color, icon: <FontAwesome name='pencil-square-o' size={iconSize} style={globalStyles.menuIcon}/>, key: '1'},
        {screenName: 'ReportsHome', text: 'Reports', backgroundColor: globalStyles.reportColor.color, icon: <Foundation name='graph-bar' size={iconSize} style={globalStyles.menuIcon}/>, key: '2'}
    ];

    let optionList = [];

    for(const item of navOptions){
        optionList.push(
            <TouchableOpacity key={item.key} style={[styles.options, {backgroundColor: item.backgroundColor}]} onPress={() => navigation.navigate(item.screenName, {prevScreen: 'Home'})}>
                {item.icon}
                <Text style={globalStyles.menuText}>{item.text}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={globalStyles.container}>
            <View style={styles.menuContainer}>
                {optionList}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 60,
        justifyContent: 'space-around',
    },
    options: {
        marginTop: '3%',
        width: '45%',
        height: '23%',
        backgroundColor: '#c98',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,

        shadowColor: '#000',
        elevation: 12,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 7.5,
    },
});

