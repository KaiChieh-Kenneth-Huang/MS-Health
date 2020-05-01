import React, {useState} from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {globalStyles} from '../../styles/global';

const SliderHandle = (props) => {
    const [moveAnim] = useState(new Animated.Value(props.initialPos))
    
    // we stop the slow animation if the user is sliding
    if(props.isSliding){
        moveAnim.setValue(props.targetPos);
    }else{
        Animated.timing(
            moveAnim,
            {
                toValue: props.targetPos,
                duration: 500,
            }
        ).start();
    }
      
  
    return (
      <Animated.View                 // Special animatable View
        style={{
            ...props.style,
            position: 'absolute',
            left: moveAnim,
            width: props.diameter,
            height: props.diameter,
            borderRadius: props.diameter / 2,
            justifyContent: 'center',
            display: 'flex',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.4,
            shadowRadius: 3.84,

            elevation: 5,
        }}
      >
        <View style={{
            width: props.diameter - 8,
            height: props.diameter - 8,
            borderRadius: (props.diameter - 8) / 2,
            backgroundColor: '#EEE',
            alignSelf: 'center'
        }}
        >
            <Text/>
        </View>
        {props.children}
      </Animated.View >
    );
}

const SliderColor = (props) => {
    const [moveAnim] = useState(new Animated.Value(props.initialPos))
    
    // we stop the slow animation if the user is sliding
    if(props.isSliding){
        moveAnim.setValue(props.targetPos + props.diameter);
    }else{
        Animated.timing(
            moveAnim,
            {
                toValue: props.targetPos + props.diameter,
                duration: 500,
            }
        ).start();
    }
      
  
    return (
      <Animated.View                 // Special animatable View
        style={{
            ...props.style,
            position: 'absolute',
            width: moveAnim,
            borderRadius: props.diameter / 2,
            justifyContent: 'center',
            display: 'flex',
        }}
      >
        {props.children}
      </Animated.View >
    );
}

export default function ValueSelector({style, highValueText, lowValueText, lowValue, highValue, value, setValue}) {
    const [sliderWidth, setSliderWidth] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [selectedValue, setSelectedValue] = useState(
        value === null || value === undefined ?
        Math.floor((highValue + lowValue) / 2) : value
    );
    const [targetHandlePos, setTargetHandlePos] = useState(0);
    const SLIDER_HEIGHT = 50;
    const interval = (sliderWidth - 50) / (highValue - lowValue);
    let numbers = [];

    setValue(selectedValue);

    if(sliderWidth !== 0 && interval > 5){ // don't generate the numbers if they will be too cramped
        for(let i=0; i <= highValue - lowValue; i++){
            numbers.push(
                <View style={[styles.numberContainer, {left: interval * i + SLIDER_HEIGHT / 2 - 10}]} key={i}>
                    <Text 
                        style={[
                            globalStyles.contentText,
                            styles.number,
                            i + lowValue < selectedValue ? styles.numberBelowCurrent : styles.numberAboveCurrent
                        ]}
                        
                    >
                        {i + lowValue}
                    </Text>
                </View>
                
            );
        }
    }
    
    return (
        <View style={{...style}}>
            <View 
                style={[styles.container, {height: SLIDER_HEIGHT}]}
            >
                <SliderColor style={{...styles.container, height: SLIDER_HEIGHT, backgroundColor: '#C74065'}} diameter={SLIDER_HEIGHT} initialPos={0} isSliding={isSliding} targetPos={targetHandlePos} />
                <SliderHandle style={{backgroundColor: '#EA6287'}} diameter={SLIDER_HEIGHT} initialPos={0} isSliding={isSliding} targetPos={targetHandlePos} />
                {numbers}
            </View>
            {/* transparent element for detecting user touch location */}
            <View 
                style={[styles.container, {height: SLIDER_HEIGHT, backgroundColor: 'transparent', position: 'absolute'}]}
                onTouchStart={(e) => {
                    setTargetHandlePos(e.nativeEvent.locationX - SLIDER_HEIGHT / 2);
                    setSelectedValue(Math.round((e.nativeEvent.locationX - SLIDER_HEIGHT / 2) / interval) + lowValue);
                }}
                onTouchMove={(e) => {
                    setTargetHandlePos(e.nativeEvent.locationX - SLIDER_HEIGHT / 2);
                    setIsSliding(true);
                    setSelectedValue(Math.round((e.nativeEvent.locationX - SLIDER_HEIGHT / 2) / interval) + lowValue);
                }}
                onTouchEnd={(e) => {
                    setIsSliding(false);
                    setTargetHandlePos(Math.round((e.nativeEvent.locationX - SLIDER_HEIGHT / 2) / interval) * interval);
                    setSelectedValue(Math.round((e.nativeEvent.locationX - SLIDER_HEIGHT / 2) / interval) + lowValue);
                }}
                onLayout={(event) => {
                    let {x, y, width, height} = event.nativeEvent.layout;
                    setSliderWidth(width);
                    setTargetHandlePos((selectedValue - lowValue) * ((width - 50) / (highValue - lowValue)));
                }}
            >
            </View>
            <View style={{marginTop: 5}}>
                <Text style={styles.lowValueText}>{lowValueText}</Text>
                <Text style={styles.highValueText}>{highValueText}</Text>
            </View>
            
        </View>
        
    );
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#E8E8E8',
        borderRadius: 25,
        justifyContent: 'center'
    },
    numberContainer: {
        position: 'absolute',
        display: 'flex',
        width: 20,
        justifyContent: 'center',
        alignContent: 'center'
    },
    number: {
        alignSelf: 'center'
    },
    numberBelowCurrent: {
        color: '#FFF'
    },
    numberAboveCurrent: {
        color: '#333'
    },
    lowValueText: {
        fontFamily: globalStyles.contentText.fontFamily,
        fontSize: globalStyles.contentText.fontSize - 4,
        color: '#555'
    },
    highValueText: {
        position: 'absolute',
        right: 0,
        fontFamily: globalStyles.contentText.fontFamily,
        fontSize: globalStyles.contentText.fontSize - 4,
        color: '#555'
    },
});