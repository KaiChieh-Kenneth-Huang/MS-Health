import React, {useState} from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {globalStyles} from '../../styles/global';

export default function CommentSection({comment, setComment, onContentSizeChange}) {
    const [cmt, setCmt] = useState(null);

    if(cmt === null){
        if(comment !== null){
            setCmt(comment);
        }else{
            setCmt("");
        }
    }
    

    return (
            <TextInput
                style={styles.userInput}
                multiline={true}
                onChangeText={text => setCmt(text)}
                onEndEditing={() => setComment(cmt)}
                onContentSizeChange={onContentSizeChange}
                value={cmt}
            />
    );
}

const styles = StyleSheet.create({
    userInput: {
        fontFamily: 'roboto-regular',
        fontSize: 16,
        paddingTop: 15,
        paddingBottom: 15,
        paddingHorizontal: 15,
        borderColor: '#BBB', 
        borderWidth: 1,
        textAlignVertical: 'top',
    },
});