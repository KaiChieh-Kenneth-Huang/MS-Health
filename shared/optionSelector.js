import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';

export default function OptionSelector({ prompt, options, initSelectedIndex, color, save}) {
    let optionList = [];

    const [selectedIndex, setSelectedIndex] = useState(initSelectedIndex);

    for(let i=0; i<options.length; i++){
        optionList.push(
            <TouchableOpacity
                key={options[i].key}
                style={[globalStyles.options,
                    {
                        backgroundColor: selectedIndex === i ? color.select : "transparent",
                        borderColor: color.regular,
                    }]}
                onPress={ () =>  {
                        setSelectedIndex(i);
                        save(options[i].value);
                    }}>
                {options[i].icon}
                <Text style={[globalStyles.menuText, {color: color.regular}]}>{options[i].text}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View>
            <Text style={globalStyles.prompt}>{prompt}</Text>
            {optionList}
        </View>
        
    );
}