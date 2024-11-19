import { WebView } from 'react-native-webview';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Reactotron from 'reactotron-react-native';
Reactotron.configure().useReactNative().connect();


import Login from './assets/src/Screens/Login';
import Cadastro from './assets/src/Screens/Cadastro';
import Perfil from './assets/src/Screens/Perfil';
import Inicial from './assets/src/Screens/Inicial';
import Verreceita from './assets/src/Screens/Verreceita';
import SplachScreen from './assets/src/Screens/SplachScreen';
import FavReceitas from './assets/src/Screens/favReceitas';
import EditarPerfil from './assets/src/Screens/EditarPerfil';
import Relatorios from './assets/src/Screens/Relatorios';
import EsqueceuSenha from './assets/src/Screens/EsqueçeuSenha';
import VerificarCodigo from './assets/src/Screens/VerificarCodigo';
import RedefinirSenha from './assets/src/Screens/RedefinirSenha';




const Guias = createBottomTabNavigator();

export default function App() {
  const user = 'Visitante'; // Defina o nome do usuário aqui, se disponível.

  return (
    <NavigationContainer>
      <Guias.Navigator
        initialRouteName="SplachScreen"
        screenOptions={{
          tabBarShowLabel: true, // Mostrar texto da Tab Bar
          tabBarActiveTintColor: '#586D5E', // Cor do texto quando ativo
          tabBarInactiveTintColor: '#586D5E', // Cor do texto quando inativo
          tabBarStyle: {
            position: 'absolute',
            bottom: 10, // Abaixando a Tab Bar
            elevation: 0,
            left: 20,
            right: 20,
            backgroundColor: '#d9eedb', // Fundo claro
            borderRadius: 15,
            height: 70,
            paddingBottom: 10,
            shadowOffset: {
              width: 0,
              height: 12,
            },
          },
        }}
      >
        <Guias.Screen
          name="SplachScreen"
          component={SplachScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' }
          }}
        />
        <Guias.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' }
          }}
        />
        <Guias.Screen
          name="cadastrar"
          component={Cadastro}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' }
          }}
        />
        <Guias.Screen
          name="Inicial"
          component={Inicial}
          initialParams={{ user }} // Passando o parâmetro user para Inicial
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarLabel: 'Inicial', // Exemplo de texto na Tab Bar
          }}
        />
        <Guias.Screen
          name="receita"
          component={Verreceita}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="fast-food" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarLabel: 'Receita', // Exemplo de texto na Tab Bar
            tabBarStyle: { display: 'none' }
          }}
        />
        <Guias.Screen
          name="favReceitas"
          component={FavReceitas}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={32} color="#586D5E" />
            ),
            headerShown: false,
            // tabBarButton: () => null,
            tabBarLabel: 'favoritas', // Exemplo de texto na Tab Bar
            // tabBarStyle: { display: 'none' }
          }}
        />
          <Guias.Screen
            name="Perfil"
            component={Perfil}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={32} color="#586D5E" />
              ),
              headerShown: false,
              tabBarLabel: 'Perfil', // Exemplo de texto na Tab Bar
              tabBarStyle: { display: 'none' }
            }}
          />
        <Guias.Screen
          name="EditarPerfil"
          component={EditarPerfil}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarLabel: 'favoritas', // Exemplo de texto na Tab Bar
            tabBarStyle: { display: 'none' }
          }}
        />
         <Guias.Screen
          name="Relatorios"
          component={Relatorios}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarLabel: 'favoritas', // Exemplo de texto na Tab Bar
            tabBarStyle: { display: 'none' }
          }}
          
        />
        <Guias.Screen
          name="EsqueçeuSenha"
          component={EsqueceuSenha}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarLabel: 'favoritas', // Exemplo de texto na Tab Bar
            tabBarStyle: { display: 'none' }
          }}
          />
            <Guias.Screen
          name="VerificarCodigo"
          component={VerificarCodigo}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarLabel: 'favoritas', // Exemplo de texto na Tab Bar
            tabBarStyle: { display: 'none' }
          }}
          />
              <Guias.Screen
          name="RedefinirSenha"
          component={RedefinirSenha}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={32} color="#586D5E" />
            ),
            headerShown: false,
            tabBarButton: () => null,
            tabBarLabel: 'favoritas', // Exemplo de texto na Tab Bar
            tabBarStyle: { display: 'none' }
          }}
          />
      </Guias.Navigator>
       
    
      {/* <WebView
      // style={styles.container}
      source={{ uri: 'https://expo.dev' }}
    /> */}
    </NavigationContainer>
  );
}

