import React, {useState} from 'react';
import {StyleSheet, View,Text, Button, FlatList, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';

export default function GamesHome({ navigation }){
    const [reviews, setReviews] = useState([
        {title: 'title 1', body: 'lorem', key: '1'},
        {title: 'title 2', body: 'lorem', key: '2'},
        {title: 'title 3', body: 'lorem', key: '3'}
    ]);
    const pressHandler = () => {
        navigation.navigate('gamesHome');
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.titleText}>Games Home</Text>
            <Button title='go to Games' onPress = {pressHandler}/>
            <FlatList 
                data={reviews}
                renderItem={({item}) => (
                    // Send data to other page
                    <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                        <Text style={globalStyles.titleText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

