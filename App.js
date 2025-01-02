import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Importações das telas
import Login from './src/Form/Login'; // Ajuste o caminho para o arquivo Login
import Categories from './src/Form/FormCategories'; 
import Formulario from './src/Form/FormScreen';
import Formulario2 from './src/Form/FormScreen2';
import Formulario3 from './src/Form/FormScreen3';
import Formulario4 from './src/Form/FormScreen4';
import Formulario5 from './src/Form/FormScreen5';
import FormCamera from './src/Form/FormCamera';
import FormCamera2 from './src/Form/FormCamera2';
import FormCamera3 from './src/Form/FormCamera3';
import FormCamera4 from './src/Form/FormCamera4';
import FormCamera5 from './src/Form/FormCamera5';
import UserInfo from './src/Form/UserInfo';
import LaudosEmAndamento from './src/Form/LaudosEmAndamento'; 
import MeusLaudos from './src/Form/MeusLaudos'; 
import LaudosConcluidos from './src/Form/LaudosConcluidos'; 

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Navegação do Drawer
function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Formulario} />
      <Drawer.Screen name="Exame" component={Formulario2} />
      <Drawer.Screen name="Observações" component={Formulario3} />
      <Drawer.Screen name="Series Auxiliares" component={Formulario4} />
      <Drawer.Screen name="Conclusão" component={Formulario5} />
      <Drawer.Screen name="Fotos do veiculo" component={FormCamera} />
      <Drawer.Screen name="Fotos das placas" component={FormCamera2} />
      <Drawer.Screen name="Fotos dos vidros" component={FormCamera3} />
      <Drawer.Screen name="Fotos do chassi" component={FormCamera4} />
      <Drawer.Screen name="Fotos do motor" component={FormCamera5} />
    </Drawer.Navigator>
  );
}

// Navegação principal (Stack Navigator)
function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{ title: 'Informações do Usuário' }}
      />
      <Stack.Screen
        name="LaudosEmAndamento"
        component={LaudosEmAndamento}
        options={{ title: 'Laudos em Andamento' }}
      />
      <Stack.Screen
        name="MeusLaudos"
        component={MeusLaudos}
        options={{ title: 'Meus Laudos' }}
      />
      <Stack.Screen
        name="LaudosConcluidos"
        component={LaudosConcluidos}
        options={{ title: 'Laudos Concluídos' }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
