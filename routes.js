import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Login from './pages/login';
import InformationList from './pages/InformationList';

export default function Routes() {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent" 
        barStyle="light-content"
        />
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Home" component={Login} />
        <AppStack.Screen name="InformationList" component={InformationList} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}