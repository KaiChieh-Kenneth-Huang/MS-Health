import 'react-native-gesture-handler';
import React, {useState} from 'react';
import * as Font from 'expo-font';
import{AppLoading} from 'expo';
import Navigator from './routes/rootSwitch';

const getFonts = () => Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });


export default function App(){
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return(
      <Navigator />
    );
  }else{
    return (
      <AppLoading
      startAsync={getFonts}
      onFinish={()=> setFontsLoaded(true)}
      />
    )
  }

  
}




/*export default function App() {
  const [name, setName] = useState('shaun');
  const [person, setPerson] = useState({ name: 'mario', age: 40});
  const [age, setAge] = useState('30');

  const [people, setPeople] = useState([
    {name: 'first', key: '1'},
    {name: 'second', key: '2'},
    {name: 'third', key: '3'},
    {name: 'fourth', key: 'g'},
    {name: 'fifth', key: '5'},
    {name: 'sixth', key: '6'},
    {name: 'seventh', key: '7'},
  ])

  const clickHandler = () => {
    setName('chun');
    setPerson({name: 'kenneth', age: 20});
  }

  const pressHandler = (key) => {
    console.log(key);
  }

  return (
    <View style={styles.container}>
      <FlatList
        // numColumns={2}
        data={people}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text>Enter name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder='e.g. John Doe'
        onChangeText={(val) => setName(val)}
      />

      <Text>My name is {name} my age is {age}</Text>


      <View style={styles.buttonContainer}>
        <Button title='update state' onPress={clickHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  body: {
    backgroundColor: 'yellow',
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: '#99f',
    fontSize: 24,
    marginHorizontal: 10,
    marginTop: 24,
  },
});*/
