import React, {useState} from 'react';
import {StyleSheet, View,Text, Button, FlatList, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import {globalStyles} from '../styles/global';
import PieChart from '../shared/pieChart';
import HorizontalSelector from '../shared/inputComponents/horizontalSelector';
import DateSelector from '../shared/inputComponents/dateSelector';
import {FontAwesome} from '@expo/vector-icons';

export default function ReportsHome({ navigation }){
    const MILLIS_IN_A_DAY = 1000 * 60 * 60 * 24;

    const [startDate, setStartDate] = useState(new Date(Date.now()  - MILLIS_IN_A_DAY * 6));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [duration, setDuration] = useState('WEEK');

    const [contentUpToDate, setContentUpToDate] = useState(false);

    const [moodChart, setMoodChart] = useState([]);
    const [moodLegend, setMoodLegend] = useState([]);
    const [energyChart, setEnergyChart] = useState([]);
    const [energyLegend, setEnergyLegend] = useState([]);
    const [symptomsChart, setSymptomsChart] = useState([]);
    const [symptomsLegend, setSymptomsLegend] = useState([]);
    const [activityChart, setActivityChart] = useState([]);
    const [activityLegend, setActivityLegend] = useState([]);
    const [sleepChart, setSleepChart] = useState([]);
    const [sleepLegend, setSleepLegend] = useState([]);
    const [dietChart, setDietChart] = useState([]);
    const [dietLegend, setDietLegend] = useState([]);


    const divergentColors = ['#488f31', '#98b989', '#e2e2e2', '#e49596', '#de425b'];
    const severityColors = ['#ea0000','#f65a3c','#fc8a6f','#fcb4a3','#f3ded9'];
    const intensityColors = ['#00e7ea', '#4bd5d7', '#64c3c4', '#73b1b1','#7d9f9f'];
    const multiItemColors = [   '#F34336', '#3F51B4','#4CAE50', '#FE9700', 
                                '#E91E63', '#2195F2', '#8AC24A', '#FE5722',
                                           '#03A8F3', '#CCDB39', '#795548', 
                                '#9B27AF', '#00BBD3', '#FEEA3B', '#9D9D9D', 
                                '#673AB6', '#009587', '#FEC007', '#607D8A'
                            ];
    const multiItemColorsLessRed = [    '#3F51B4','#4CAE50', '#FE9700', 
                                        '#2195F2', '#8AC24A',
                                                    '#03A8F3', '#CCDB39', '#795548', 
                                        '#9B27AF', '#00BBD3', '#FEEA3B', '#9D9D9D', 
                                        '#673AB6', '#009587', '#FEC007', '#607D8A'
    ];
    const multiItemColorsLessBlue = [   '#F34336', '#3F51B4','#4CAE50', '#FE9700', 
                                        '#E91E63', '#8AC24A', '#FE5722',
                                                   '#CCDB39', '#795548', 
                                        '#9B27AF', '#FEEA3B',  
                                        '#673AB6', '#009587', '#FEC007'
                            ];
    const sleepTimeColors24Hr = [
                                '#ac0000','#f90000','#ff5737','#ff8364','#ffa991','#ffcdc0','#b4eca3','#64e350',
                                '#00de06','#87d7da','#8cbecd','#60a9c9','#3194c7','#007dc3','#0064bc','#0049af',
                                '#6663b7','#9581bf','#b8a3ca','#d4c8d7','#c7a3c8','#be7cb3','#b75099','#af007a'
                                ];
    const sliceColor1 = ['#f00','#fcba03','#f4fc03', '#0f0', '#00f'];
    const sliceColor2 = ['#000','#555','#888', '#aaa', '#ccc'];
    let segments1 = [50, 30, 20];
    let segments2= [30, 10, 10, 10, 10, 10, 5, 10, 5];

    const strToTimeInterval = (str) => {
        switch(str) {
            case 'WEEK':
                return MILLIS_IN_A_DAY * 6;
            case 'MONTH':
                return MILLIS_IN_A_DAY * 29;
            case 'CUSTOM':
                return null;
            default:
                return null;
        }
    };

    const legend = (color, name, value, unit) => {      
        return <View key={name} style={styles.legendContainer}>
            <FontAwesome name='square' size={styles.legendColorBox.fontSize} style={[styles.legendColorBox, {color: color}]} />
            <View style={{minWidth: 150}}>
                <Text style={[globalStyles.contentText, styles.legendName]}> {name} </Text>
            </View>
            <View style={{minWidth: 60}}>
                <Text style={[globalStyles.contentText, styles.legendValue]}> {value} </Text>
            </View>
            <Text style={[globalStyles.contentText, styles.legendUnit]}> {unit} </Text>
        </View>;
    };

    const loadContent = async () => {
        let promises = [];
        let startTime = startDate.getTime();
        let endTime = endDate.getTime();

        for(let time = startTime; time <= endTime; time += MILLIS_IN_A_DAY) {
            promises.push(AsyncStorage.getItem((new Date(time)).toDateString())); //
        }
        
        const resolves = await Promise.all(promises);
        const dateDataArr = resolves.map((item) => {
            return item === null ? null : JSON.parse(item);
        });
        makeMoodChart(dateDataArr);
        makeEnergyChart(dateDataArr);
        makeSymptomsChart(dateDataArr);
        makeActivityChart(dateDataArr);
        makeSleepChart(dateDataArr);
        makeDietChart(dateDataArr);
    };

    // const makeMoodChart = (dateDataArr) => {
    //     let daysRecorded = 0;
    //     let countsObj = {};
    //     let counts = [];

    //     for(const dateData of dateDataArr) {
    //         if(dateData.mood){
    //             const mood = dateData.mood.type;
    //             if(countsObj[mood]) {
    //                 countsObj[mood]++;
    //             } else {
    //                 countsObj[mood] = 1;
    //             }
    //             daysRecorded++;
    //         }
    //     }

    //     for(const type of Object.getOwnPropertyNames(countsObj)) {
    //         counts.push({type: type, count: countsObj[type]});
    //     }

    //     // sort in decending order
    //     counts.sort(function(a, b) {
    //         return b.count - a.count;
    //     });
    //     setMoodChart(<PieChart values1={counts.map(count => count.count)} colors1={sliceColor1} centerNum={""} centerText=""/>);
    // };

    const makeMoodChart = (dateDataArr) => {
        const colors = {Excited: '#488f31', Happy: '#7fab6c', Neutral: '#e2e2e2', Irritated: '#e6afaf', Sad: '#e17b7e', Depressed: '#de425b'};
        const unit = 'day(s)';
        let positiveDays = 0;
        let daysRecorded = 0;
        let countsObj = {};
        let counts = [];

        for(const dateData of dateDataArr) {
            if(dateData){
                if(dateData.mood){
                    const mood = dateData.mood.type;
                    if(countsObj[mood]) {
                        countsObj[mood]++;
                    } else {
                        countsObj[mood] = 1;
                    }
                    daysRecorded++;
                }
            }
        }

        if(countsObj['Excited'])
            positiveDays += countsObj['Excited'];
        if(countsObj['Happy'])
            positiveDays += countsObj['Happy'];

        for(const type of Object.getOwnPropertyNames(countsObj)) {
            counts.push({type: type, count: countsObj[type]});
        }

        // sort according to mood
        counts.sort(function(a, b) {
            function value (mood) {
                switch(mood) {
                    case 'Excited':
                        return 1;
                    case 'Happy':
                        return 2;
                    case 'Neutral':
                        return 3;
                    case 'Irritated':
                        return 4;
                    case 'Sad':
                        return 5;
                    case 'Depressed':
                        return 6;
                    default:
                        return 0;
                }
            }
            return value(a.type) - value(b.type);
        });

        if(daysRecorded){
            setMoodChart(<PieChart values1={counts.map(count => count.count)} colors1={counts.map(count => colors[count.type])} centerNum={positiveDays} centerText={positiveDays > 1 ? "Positive Days" : "Positive Day"}/>);
            setMoodLegend([
                <Text key={0} style={styles.legendNote}>Out of {daysRecorded} {unit}</Text>,
                ...counts.map(count => legend(colors[count.type], count.type, count.count, unit))
            ]);
        }else{
            setMoodChart(<Text style={[globalStyles.contentText, styles.legendNote]}>No Data Available</Text>);
            setMoodLegend(null);
        }
    };

    const makeEnergyChart = (dateDataArr) => {
        const colors = {'Very High (5)': '#488f31', 'High (4)': '#98b989', 'Neutral (3)': '#e2e2e2', 'Low (2)': '#e49596', 'Very Low (1)': '#de425b'};
        const unit = 'day(s)';
        let energySum = 0;
        let averageEnergy;
        let daysRecorded = 0;
        let countsObj = {};
        let counts = [];

        function lvlToDescription (lvl) {
            switch(lvl) {
                case '1':
                    return 'Very Low (1)';
                case '2':
                    return 'Low (2)';
                case '3':
                    return 'Neutral (3)';
                case '4':
                    return 'High (4)';
                case '5':
                    return 'Very High (5)';
                default:
                    return '?';
            }
        }

        for(const dateData of dateDataArr) {
            if(dateData){
                if(dateData.energy){
                    const energy = dateData.energy.value;
                    if(countsObj[energy]) {
                        countsObj[energy]++;
                    } else {
                        countsObj[energy] = 1;
                    }
                    daysRecorded++;
                    energySum += energy;
                }
            }
        }

        averageEnergy = energySum / daysRecorded;

        for(const energyLvl of Object.getOwnPropertyNames(countsObj)) {
            counts.push({type: energyLvl, count: countsObj[energyLvl]});
        }

        // sort according to mood
        counts.sort(function(a, b) {
            return b.type - a.type;
        });

        // change name of each energy level from number to description for generating legends
        for(let item of counts) {
            item.type = lvlToDescription(item.type);
        }

        if(daysRecorded){
            setEnergyChart(<PieChart values1={counts.map(count => count.count)} colors1={counts.map(count => colors[count.type])} centerNum={averageEnergy.toFixed(1)} centerText="Ave. Energy"/>);
            setEnergyLegend([
            <Text key={0} style={styles.legendNote}>Out of {daysRecorded} {unit}</Text>,
                ...counts.map(count => legend(colors[count.type], count.type, count.count, unit))
            ]);
        }else{
            setEnergyChart(<Text style={[globalStyles.contentText, styles.legendNote]}>No Data Available</Text>);
            setEnergyLegend(null);
        }
        
    };

    const makeSymptomsChart = (dateDataArr) => {
        const unit = 'hr';
        let daysRecorded = 0;
        let daysAffected = 0;
        let countsObj = {};
        let counts = [];

        // countsObj =
        //   Object {
        //    SymptomType: {  // use object instead of array to save because value may not always be non-negative interger
        //      SymptomVal: Number duration
        //    }
        //   }

        for(const dateData of dateDataArr) {
            if(dateData){
                daysRecorded++;
                if(dateData.symptoms){
                    if(dateData.symptoms.length === 0){
                        continue;
                    }
                    for(const symptom of dateData.symptoms){
                        const timeDif = symptom.endTime - symptom.startTime; // time difference in minutes
                        const duration = timeDif > 0 ? timeDif : timeDif + 60 * 24; // if end time is smaller, assume end time is in the next day
                        
                        if(countsObj[symptom.type]) {
                            if(countsObj[symptom.type][symptom.value]){
                                countsObj[symptom.type][symptom.value] += duration;
                            }else{
                                countsObj[symptom.type][symptom.value] = duration;
                            }
                            countsObj[symptom.type].total += duration;
                        } else {
                            countsObj[symptom.type] = {};
                            countsObj[symptom.type][symptom.value] = duration;
                            countsObj[symptom.type].total = duration;
                        }
                    }
                    daysAffected++;
                }
            }
        }

        for(const type of Object.getOwnPropertyNames(countsObj)) {
            counts.push({
                type: type,
                values: countsObj[type] // includes total and minutes for individual severity values
            });
        }

        // sort in decending order
        counts.sort(function(a, b) {
            return b.values.total - a.values.total;
        });

        // calculate duration of each severity level
        // generate array for making the severity ring in the doughnut chart
        let timeForEachValue = [];
        let totalTimeForEachValue = [];
        
        for(const count of counts){
            let j = 0; // used for tracking the index of totalTimeForEachValue. This is implemented because severity may not be non-negative interger
            for(let i=5; i>=1; i--, j++){ // severity for symptoms range from 1-5
                if(totalTimeForEachValue[j] === undefined){
                    totalTimeForEachValue[j] = {value: i, sum: 0}
                }

                if(count.values[i]){
                    timeForEachValue.push(count.values[i]);
                    totalTimeForEachValue[j].sum += count.values[i];
                }else{
                    timeForEachValue.push(0);
                }
            }
        }

        let symptomsLegend = [];

        for(let i = 0; i < counts.length; i++){
            let index = i >= multiItemColorsLessRed.length ? i % multiItemColorsLessRed.length : i; // prevents types being more than available colors
            symptomsLegend.push(legend(multiItemColorsLessRed[index], counts[i].type, (counts[i].values.total / 60).toFixed(1), unit));
        }
        symptomsLegend.push(<View key={'space'} style={{height: 10}}></View>);
        for(let i = 0; i < totalTimeForEachValue.length; i++){
            symptomsLegend.push(legend(severityColors[i], 'Severity ' + totalTimeForEachValue[i].value, (totalTimeForEachValue[i].sum / 60).toFixed(1), unit));
        }
        

        if(daysAffected){
            setSymptomsChart(<PieChart values1={counts.map(count => count.values.total)} colors1={multiItemColorsLessRed} values2={timeForEachValue} colors2={severityColors} centerNum={daysAffected} centerText={daysAffected > 1 ? "Affected Days" : "Affected Day"}/>);
            setSymptomsLegend([
                <Text key={0} style={styles.legendNote}>Out of {daysRecorded} {'Days'}</Text>,
                ...symptomsLegend
            ]);
        }else{
            setSymptomsChart(<Text style={[globalStyles.contentText, styles.legendNote]}>No Data Available</Text>);
            setSymptomsLegend(null);
        }
    };

    const makeActivityChart = (dateDataArr) => {
        const unit = 'hr';
        let daysRecorded = 0; // calculate how many days the user tried to enter value
        let totalTime = 0;
        let countsObj = {};
        let counts = [];

        // countsObj =
        //   Object {
        //    SymptomType: {  // use object instead of array to save because value may not always be non-negative interger
        //      SymptomVal: Number duration
        //    }
        //   }

        for(const dateData of dateDataArr) {
            if(dateData){
                daysRecorded++;
                if(dateData.activity){
                    if(dateData.activity.length === 0){
                        continue;
                    }
                    for(const activity of dateData.activity){
                        const timeDif = activity.endTime - activity.startTime; // time difference in minutes
                        const duration = timeDif > 0 ? timeDif : timeDif + 60 * 24; // if end time is smaller, assume end time is in the next day
                        
                        if(countsObj[activity.type]) {
                            if(countsObj[activity.type][activity.value]){
                                countsObj[activity.type][activity.value] += duration;
                            }else{
                                countsObj[activity.type][activity.value] = duration;
                            }
                            countsObj[activity.type].total += duration;
                        } else {
                            countsObj[activity.type] = {};
                            countsObj[activity.type][activity.value] = duration;
                            countsObj[activity.type].total = duration;
                        }
                    }
                }
            }
        }

        for(const type of Object.getOwnPropertyNames(countsObj)) {
            counts.push({
                type: type,
                values: countsObj[type] // includes total and minutes for individual intensity values
            });
            totalTime += countsObj[type].total;
        }

        // sort in decending order
        counts.sort(function(a, b) {
            return b.values.total - a.values.total;
        });

        // calculate duration of each intensity level
        // generate array for making the intensity ring in the doughnut chart
        let timeForEachValue = [];
        let totalTimeForEachValue = [];
        
        for(const count of counts){
            let j = 0; // used for tracking the index of totalTimeForEachValue. This is implemented because intensity may not be non-negative interger
            for(let i=5; i>=1; i--, j++){ // intensity for symptoms range from 1-5
                if(totalTimeForEachValue[j] === undefined){
                    totalTimeForEachValue[j] = {value: i, sum: 0}
                }

                if(count.values[i]){
                    timeForEachValue.push(count.values[i]);
                    totalTimeForEachValue[j].sum += count.values[i];
                }else{
                    timeForEachValue.push(0);
                }
            }
        }

        let activityLegend = [];

        for(let i = 0; i < counts.length; i++){
            let index = i >= multiItemColorsLessBlue.length ? i % multiItemColorsLessBlue.length : i; // prevents types being more than available colors
            activityLegend.push(legend(multiItemColorsLessBlue[index], counts[i].type, (counts[i].values.total / 60).toFixed(1), unit));
        }
        activityLegend.push(<View key={'space'} style={{height: 10}}></View>);
        for(let i = 0; i < totalTimeForEachValue.length; i++){
            activityLegend.push(legend(intensityColors[i], 'Intensity ' + totalTimeForEachValue[i].value, (totalTimeForEachValue[i].sum / 60).toFixed(1), unit));
        }
        

        if(counts.length){
            const aveHrs = (totalTime / 60 / daysRecorded).toFixed(1);
            setActivityChart(<PieChart values1={counts.map(count => count.values.total)} colors1={multiItemColorsLessBlue} values2={timeForEachValue} colors2={intensityColors} centerNum={aveHrs} centerText={aveHrs > 1 ? "Hours / Day" : "Hour / Day"}/>);
            setActivityLegend(activityLegend);
        }else{
            setActivityChart(<Text style={[globalStyles.contentText, styles.legendNote]}>No Data Available</Text>);
            setActivityLegend(null);
        }
    };

    const makeSleepChart = (dateDataArr) => {
        const unit = 'Day(s)';
        const qualityName = ['Very Well (5)', 'Well (4)', 'Average (3)', 'Poorly (2)', 'Very Poorly (1)'];
        let sleepDaysRecorded = 0;
        let sleepTimeSum = 0;
        let counts = [];

        // each day's sleep time is collected into bins of 1-hr width
        // the number of days of various sleep quality is recorded in the qualityCount array, associated with each bin
        for(let i=0; i<24; i++){
            const str = i + "-" + (i + 1) + " hr";
            counts.push({type: str, count: 0, values: [0, 0, 0, 0, 0]});
        }

        for(const dateData of dateDataArr) {
            if(dateData){
                if(dateData.sleep){
                    const timeDif = dateData.sleep.endTime - dateData.sleep.startTime; // time difference in minutes
                    const sleepTime = timeDif > 0 ? timeDif : timeDif + 60 * 24; // if end time is smaller, assume end time is in the next day
                    
                    sleepTimeSum += sleepTime;
                    sleepDaysRecorded++;

                    counts[Math.floor(sleepTime / 60)].count++;
                    counts[Math.floor(sleepTime / 60)].values[dateData.sleep.value - 1]++;
                }
            }
        }

        // calculate total days of each sleep quality
        // generate array for making the sleep quality ring in the doughnut chart
        let daysForEachValue = [];
        let totalDaysForEachValue = [];
        
        for(const count of counts){
            let j = 0; // used for tracking the index of totalDaysForEachValue. This is implemented because quality value may not be non-negative interger
            for(let i=5; i>=1; i--, j++){ // quality range from 1-5
                if(totalDaysForEachValue[j] === undefined){
                    totalDaysForEachValue[j] = {value: i, sum: 0}
                }

                if(count.values[i-1]){
                    daysForEachValue.push(count.values[i-1]);
                    totalDaysForEachValue[j].sum += count.values[i-1];
                }else{
                    daysForEachValue.push(0);
                }
            }
        }

        let sleepLegend = [];

        for(let i = 0; i < counts.length; i++){
            let index = i >= sleepTimeColors24Hr.length ? i % sleepTimeColors24Hr.length : i; // prevents types being more than available colors
            if(counts[i].count){
                sleepLegend.push(legend(sleepTimeColors24Hr[index], counts[i].type, counts[i].count, unit));
            }
        }
        sleepLegend.push(<View key={'space'} style={{height: 10}}></View>);
        for(let i = 0; i < totalDaysForEachValue.length; i++){
            sleepLegend.push(legend(divergentColors[i], qualityName[i], totalDaysForEachValue[i].sum, unit));
        }
        

        if(sleepDaysRecorded){
            const aveSleep = (sleepTimeSum / 60 / sleepDaysRecorded).toFixed(1);

            setSleepChart(<PieChart values1={counts.map(count => count.count)} colors1={sleepTimeColors24Hr} values2={daysForEachValue} colors2={divergentColors} centerNum={aveSleep} centerText={'Ave. Sleep Hr'}/>);
            setSleepLegend([
                <Text key={0} style={styles.legendNote}>Out of {sleepDaysRecorded} {'Day(s)'}</Text>,
                ...sleepLegend
            ]);
        }else{
            setSleepChart(<Text style={[globalStyles.contentText, styles.legendNote]}>No Data Available</Text>);
            setSleepLegend(null);
        }
    };

    const makeDietChart = (dateDataArr) => {
        const unit = 'Cal';
        let daysDietRecorded = 0; // calculate how many days the user tried to enter value
        let totalCal = 0;
        let countsObj = {};
        let counts = [];

        for(const dateData of dateDataArr) {
            if(dateData){
                if(dateData.diet){
                    if(dateData.diet.length === 0){
                        continue;
                    }
                    daysDietRecorded++;
                    for(const meal of dateData.diet){
                        if(meal.foods){
                            for(const food of meal.foods){
                                if(countsObj[food.type]) {
                                    countsObj[food.type] += food.calorie;
                                } else {
                                    countsObj[food.type] = food.calorie;
                                }
                            }
                        }
                    }
                }
            }
        }

        for(const type of Object.getOwnPropertyNames(countsObj)) {
            counts.push({
                type: type,
                value: countsObj[type]
            });
            totalCal += countsObj[type];
        }

        // sort in decending order
        counts.sort(function(a, b) {
            return b.value - a.value;
        });

        let dietLegend = [];

        for(let i = 0; i < counts.length; i++){
            let index = i >= multiItemColors.length ? i % multiItemColors.length : i; // prevents types being more than available colors
            dietLegend.push(legend(multiItemColors[index], counts[i].type, ((counts[i].value / totalCal) * 100).toFixed(1), '%'));
        }

        if(counts.length){
            const aveCal = Math.round(totalCal / daysDietRecorded);
            setDietChart(<PieChart values1={counts.map(count => count.value)} colors1={multiItemColors} centerNum={aveCal} centerText={"Cal / Day"}/>);
            setDietLegend(dietLegend);
        }else{
            setDietChart(<Text style={[globalStyles.contentText, styles.legendNote]}>No Data Available</Text>);
            setDietLegend(null);
        }
    };

    if(!contentUpToDate){
        //loadContent().catch(() => {alert('Data failed to load properly. Please try changing the dates.');});
        loadContent();
        setContentUpToDate(true);
    }
    

    return (
        <View style={[globalStyles.container]}>
            <ScrollView>
                <View style={globalStyles.contentContainerBN}>
                    <View style={styles.dateRangeContainer}>
                        <HorizontalSelector 
                            values={['WEEK', 'MONTH', 'CUSTOM']}
                            selectedValue={duration}
                            width={100}
                            color={globalStyles.reportColor.color}
                            selectedFillColor={globalStyles.reportSelectColor.color}
                            operationFunc={(selection) => {
                                const timeInterval = strToTimeInterval(selection);
                                setDuration(selection);
                                if(timeInterval) {
                                    setStartDate(new Date(endDate.getTime() - timeInterval));
                                }
                                setContentUpToDate(false);
                            }}
                        />
                        <View style={styles.dateSelectorContainer}>
                            <DateSelector style={styles.dateSelectorMargin} value={startDate} iconColor={globalStyles.reportColor.color} 
                                dateSetter={(newDate) => {
                                    const timeInterval = strToTimeInterval(duration);
                                    if(timeInterval) {
                                        let newEndDate = new Date(newDate.getTime() + timeInterval);
                                        if(newEndDate.getTime() > Date.now()){
                                            newEndDate.setTime(Date.now());
                                        }
                                        setEndDate(newEndDate);
                                        
                                    }else{  // custom range. We should check if start time is no later than end time
                                        if(newDate.getTime() > endDate.getTime()){
                                            setEndDate(newDate);
                                        }
                                    }
                                    setStartDate(newDate);
                                }}
                                doneAction={() => {
                                    setContentUpToDate(false);
                                }}
                            />
                            <Text style={[globalStyles.contentText, styles.dateSelectorText]}>to</Text>
                            <DateSelector 
                                style={styles.dateSelectorMargin} 
                                value={endDate} 
                                iconColor={globalStyles.reportColor.color} 
                                dateSetter={(newDate) => {
                                    const timeInterval = strToTimeInterval(duration);
                                    if(timeInterval) {
                                        setStartDate(new Date(newDate.getTime() - timeInterval));
                                        
                                    }else{ // custom range. We should check if start time is no later than end time
                                        if(newDate.getTime() < startDate.getTime()){
                                            setStartDate(newDate);
                                        }
                                    }
                                    setEndDate(newDate);
                                }}
                                doneAction={() => {
                                    setContentUpToDate(false);
                                }}
                            />
                        </View>
                    </View>


                    <View style={styles.categoryContainer}>
                        <Text style={[globalStyles.titleText, styles.categoryTitle]}>
                            MOOD
                        </Text>
                        <View style={styles.doughNutChart}>
                            {moodChart}
                        </View>
                        
                        <View style={styles.legend}>
                            {moodLegend}
                        </View>
                    </View>

                    <View style={styles.categoryContainer}>
                        <Text style={[globalStyles.titleText, styles.categoryTitle]}>
                            ENERGY
                        </Text>
                        <View style={styles.doughNutChart}>
                            {energyChart}
                        </View>
                        
                        <View style={styles.legend}>
                            {energyLegend}
                        </View>
                    </View>
                    
                    <View style={styles.categoryContainer}>
                        <Text style={[globalStyles.titleText, styles.categoryTitle]}>
                            SYMPTOMS
                        </Text>
                        <View style={styles.doughNutChart}>
                            {symptomsChart}
                        </View>
                        
                        <View style={styles.legend}>
                            {symptomsLegend}
                        </View>
                    </View> 

                    <View style={styles.categoryContainer}>
                        <Text style={[globalStyles.titleText, styles.categoryTitle]}>
                            ACTIVITY
                        </Text>
                        <View style={styles.doughNutChart}>
                            {activityChart}
                        </View>
                        
                        <View style={styles.legend}>
                            {activityLegend}
                        </View>
                    </View>

                    <View style={styles.categoryContainer}>
                        <Text style={[globalStyles.titleText, styles.categoryTitle]}>
                            SLEEP
                        </Text>
                        <View style={styles.doughNutChart}>
                            {sleepChart}
                        </View>
                        
                        <View style={styles.legend}>
                            {sleepLegend}
                        </View>
                    </View> 

                    <View style={styles.categoryContainer}>
                        <Text style={[globalStyles.titleText, styles.categoryTitle]}>
                            DIET
                        </Text>
                        <View style={styles.doughNutChart}>
                            {dietChart}
                        </View>
                        
                        <View style={styles.legend}>
                            {dietLegend}
                        </View>
                    </View> 

                </View>
            </ScrollView>
            


            {/* <Text style={globalStyles.titleText}>Reports Home</Text>
            <Button title='go to Reports' onPress = {pressHandler}/>
            <FlatList 
                data={reviews}
                renderItem={({item}) => (
                    // Send data to other page
                    <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', item)}>
                        <Text style={globalStyles.titleText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    dateRangeContainer: {
        marginTop: 20,
    },
    dateSelectorMargin: {
    },
    dateSelectorContainer: {
        marginTop: 20,
    },
    dateSelectorText: {
        textAlign: 'center',
        marginVertical: 5,
    },
    doughNutChart: {
        height: 200,
        marginTop: 15
    },
    categoryContainer: {
        marginVertical: 20
    },
    categoryTitle: {
        marginTop: 0,
        textAlign: 'center'
    },
    legend: {
        marginTop: 10
    },
    legendNote: {
        textAlign: 'center',
        marginBottom: 10,
    },
    legendContainer: {
        marginTop: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    legendColorBox: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    legendName: {

    },
    legendValue: {
        textAlign: 'right'
    },
});