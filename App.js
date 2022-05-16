import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chinh from './src/activities/a_chinh'
import LuuTru from './src/activities/a_luutru'
import Dangnhap from './src/activities/a_dangnhap'
import KhamPha from './src/activities/a_khampha'
import BanGhi from './src/activities/a_banghi'
import ThucHien from './src/activities/a_thuchien'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dangnhap"   screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dangnhap" component={Dangnhap} />
        <Stack.Screen name="Chinh" component={Chinh} />
        <Stack.Screen name="LuuTru" component={LuuTru} />
        <Stack.Screen name="KhamPha" component={KhamPha} />
        <Stack.Screen name="BanGhi" component={BanGhi} />
        <Stack.Screen name="ThucHien" component={ThucHien} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

