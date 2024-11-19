import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicial from './assets/src/Screens/Inicial';
import Verreceita from './assets/src/Screens/Verreceita';

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="inicial" component={Inicial} />
            </Stack.Navigator>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Receita" component={Verreceita} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

const styles = StyleSheet.create({});
