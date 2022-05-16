import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ScrollView, TouchableHighlight} from 'react-native';
import Chinh from './src/activities/a_chinh'
import LuuTru from './src/activities/a_luutru'
import Dangnhap from './src/activities/a_dangnhap'
import KhamPha from './src/activities/a_khampha'
import BanGhi from './src/activities/a_banghi'
import ThucHien from './src/activities/a_thuchien'
import ChuDe from './src/activities/a_chude'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <ScrollView contentContainerStyle={{height: "100%"}}> */}
        <Stack.Navigator initialRouteName="Dangnhap"   screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dangnhap" component={Dangnhap} />
          <Stack.Screen name="Chinh" component={Chinh} />
          <Stack.Screen name="LuuTru" component={LuuTru} />
          <Stack.Screen name="KhamPha" component={KhamPha} />
          <Stack.Screen name="BanGhi" component={BanGhi} />
          <Stack.Screen name="ThucHien" component={ThucHien} />
          <Stack.Screen name="ChuDe" component={ChuDe} />
        </Stack.Navigator>
      {/* </ScrollView> */}
    </NavigationContainer>
  );
}

