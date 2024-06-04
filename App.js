// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Formulario from './src/Form/FormScreen';
import Formulario2 from './src/Form/FormScreen2';
import Formulario3 from './src/Form/FormScreen3';
import Formulario4 from './src/Form/FormScreen4';
import Formulario5 from './src/Form/FormScreen5';
import FormCamera from './src/Form/FormCamera';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormularioParte1">
        <Stack.Screen name="FormularioParte1" component={Formulario} options={{ title: 'Parte 1' }} />
        <Stack.Screen name="FormularioParte2" component={Formulario2} options={{ title: 'Parte 2' }} />
        <Stack.Screen name="FormularioParte3" component={Formulario3} options={{ title: 'Parte 3' }} />
        <Stack.Screen name="FormularioParte4" component={Formulario4} options={{ title: 'Parte 4' }} />
        <Stack.Screen name="FormularioParte5" component={Formulario5} options={{ title: 'Parte 5' }} />
        <Stack.Screen name="FormularioCamera" component={FormCamera} options={{ title: 'Parte 6' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
