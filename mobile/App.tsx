// React e componentes
import React from 'react';
import { Text as RNText } from 'react-native';

// Bibliotecas de terceiros
import { NativeBaseProvider, Text, extendTheme } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

// Páginas
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Reports from './src/pages/Reports';

// Tema personalizado
import { customTheme } from './theme';
import AccessPortal from './src/pages/AccessPortal';
import Loading from './src/pages/Loading';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { UserId: string };
  AccessPortal: undefined;
  Reports: undefined;
  Loading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Loading' component={Loading} />
          <Stack.Screen name='AccessPortal' component={AccessPortal} />
          <Stack.Screen name='Reports' component={Reports} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
