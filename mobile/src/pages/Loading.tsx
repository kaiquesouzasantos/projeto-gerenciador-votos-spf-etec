// React e componentes
import React, { useEffect } from 'react';
import Logo from '../components/Logo';

// Bibliotecas de terceiros
import { Center, StatusBar } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

// Tipos e constantes
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { axiosClient } from '../libs/axios';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ILoadingProps {
  navigation: LoginScreenNavigationProp;
}

export default function Loading({ navigation }: ILoadingProps) {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }
    (async () => {
      try {
        const data = (await JSON.parse(
          await AsyncStorage.getItem('@loggedUserData')
        )) as { nome: string; email: string; senha: string; id: string };
        const response = await axiosClient.get(
          `professor/auth?email=${data.email}&senha=${encodeURIComponent(
            data.senha
          )}`
        );

        if (response.status === 200) {
          navigation.navigate('Home', { UserId: data.id });
        } else {
          navigation.navigate('AccessPortal');
        }
      } catch (error) {
        navigation.navigate('AccessPortal');

        console.log(error);
      }
    })();
  }, [fontsLoaded]);

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <Center flex={1} background='white'>
        <Logo noMargin full />
      </Center>
    </>
  );
}
