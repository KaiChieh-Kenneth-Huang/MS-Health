import React, {useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, AsyncStorage} from 'react-native';
import {globalStyles} from '../../styles/global';
import DialogInput from 'react-native-dialog-input'; // https://github.com/joseestrella89/react-native-dialog-input#readme
import {Entypo} from '@expo/vector-icons';

export default function DropDownSelector({style, listItemName, listName, defaultList, initialSelection, onSelect = () => {}}) {
    const [curSelect, setCurSelect] = useState(initialSelection);
    const [dropDownOpened, setDropDownOpened] = useState(false);
    const [list, setList] = useState(null);
    const [isDialogVisible, setIsDialogVisible] = useState(false);

    let displayText = curSelect === null ||  curSelect === undefined ? 'Select ' + listItemName  + '...' : curSelect;
    let optionList = [];

    const loadList = async () => {
        try {
            const data = await AsyncStorage.getItem(listName);
            
            if (data !== null) {
                // We have data!!
                setList(JSON.parse(data));
            } else {
                // Load default symptoms
                setList(defaultList);
            }
        } catch (e) {
            // Error retrieving data
            setList(defaultList);
            console.log('Error retrieving list: ' + listName);
        }
    };

    const selectOption = (selectedOption) => {
        setCurSelect(selectedOption);
        setDropDownOpened(false);
        onSelect(selectedOption); // pass the current selection to the parent of this dropDownSelector
    };

    const addOption = async (inputText) => {
        // add option to list and save
        list.push(inputText);
        list.sort();

        try {
            await AsyncStorage.setItem(listName, JSON.stringify(list));
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }

        selectOption(inputText);
        setIsDialogVisible(false);
    };

    const removeOption = async (index) => {
        list.splice(index, 1);

        try {
            await AsyncStorage.setItem(listName, JSON.stringify(list));
        } catch (e) {
            // saving error
            console.log("error saving to AsyncStorage");
        }
        
        // refresh the dropdown
        setDropDownOpened(false);
        setDropDownOpened(true);

    };

    if(list === null){
        loadList();
    }

    // populate the list with items
    for(let i = 0; list !== null && i < list.length; i++){
        // logic for styling selected option and adding bottom border to last item
        let optionStyle = [styles.option];

        if(list[i] === curSelect) {
            optionStyle.push(styles.selectedOption);
        }

        optionList.push(
            <TouchableHighlight
                key={i}
                activeOpacity = {0.6}
                underlayColor = {styles.selectedOption.backgroundColor}
                onPress={() => selectOption(list[i])}>

                <View style={optionStyle}>
                    <Text style={[globalStyles.contentText, styles.optionText]}>{list[i]}</Text>
                    <TouchableHighlight
                        style = {styles.deleteOptionIconContainer}
                        activeOpacity = {0.6}
                        underlayColor = {'#977'}
                        onPress={() => removeOption(i)}>

                        <Entypo name='cross' size={24} style={styles.deleteOptionIcon}/>
                    </TouchableHighlight>
                </View>
            </TouchableHighlight>
        );
    }

    // append the option to add a list item
    optionList.push(
        <TouchableHighlight
            key={-1}
            activeOpacity = {0.6}
            underlayColor = {styles.selectedOption.backgroundColor}
            onPress={() => setIsDialogVisible(true)}>

            <View style={[styles.option, {borderBottomWidth: 1}]}>
                <Text style={[globalStyles.contentText, styles.optionText ,{color: '#888'}]}>{'Create a new ' + listItemName}</Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <View style={style}>
            {/* display for the selected item */}
            <TouchableOpacity style={styles.mainBox} onPress={ () => setDropDownOpened(!dropDownOpened)}>
                <Text style={globalStyles.contentText}>{displayText}</Text>
            </TouchableOpacity>
        
            {/* dropdown shown whenever the display for selected item is tapped */}
            {dropDownOpened ? optionList : null}

            {/*Dialog for adding new item to list*/}
            <DialogInput
                isDialogVisible={isDialogVisible}
                title={'Create a new ' + listItemName}
                message={'Please enter the name of the ' + listItemName + '.'}
                hintInput ={''}
                submitInput={ (inputText) => addOption(inputText)}
                closeDialog={ () => setIsDialogVisible(false)}>
            </DialogInput>
        </View>
    );
}

const styles = StyleSheet.create({
    mainBox: {
        backgroundColor: '#EEE',
        borderColor: '#BBB',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%'
    },
    optionText: {
        marginVertical: 10,
    },
    option: {
        backgroundColor: '#EEE',
        borderColor: '#BBB',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        paddingHorizontal: 20,
        width: '100%',
        justifyContent: 'center',
    },
    selectedOption: {
        backgroundColor: '#88AADD'
    },
    deleteOptionIconContainer: {
        position: 'absolute',
        right: 0,
        paddingHorizontal: 10,
        justifyContent: 'center',
        height: '100%'
    },
    deleteOptionIcon: {
        color: '#333'
    }
});