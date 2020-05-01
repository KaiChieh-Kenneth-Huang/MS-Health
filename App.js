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