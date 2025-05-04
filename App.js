import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherComponent from '../Weather/src/components/WeatherComponent';
import InfoComponent from '../Weather/src/components/InfoComponent';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Weather">
                <Stack.Screen name="Weather" component={WeatherComponent} />
                <Stack.Screen name="Info" component={InfoComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
