// React e componentes
import React, { useEffect } from 'react';
import Logo from '../components/Logo';

// Bibliotecas de terceiros
import { Center, StatusBar } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadAsync } from 'expo-font';
import { useQueryClient } from '@tanstack/react-query';

// Tipos e constantes
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { axiosClient } from '../libs/axios';
import axios from 'axios';
import { axiosProfessor } from '../libs/axiosProfessor';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ILoadingProps {
  navigation: LoginScreenNavigationProp;
}

export default function Loading({ navigation }: ILoadingProps) {
  const queryClient = useQueryClient();

  async function prefetch() {
    const { data } = await axiosClient.get('classificacao');
    return data;
  }

  //Faz o prefetch dos dados de classificao
  useEffect(() => {
    (async () => {
      try {
        await queryClient.prefetchQuery({
          queryKey: ['classificacao'],
          queryFn: prefetch,
        });
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        await loadAsync({
          'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        });
      } catch (error) {
        console.log(error);
      }

      try {
        //Busca informações do professor logado no aparelho e tenta fazer login
        const data = (await JSON.parse(
          await AsyncStorage.getItem('@loggedUserData')
        )) as { nome: string; email: string; senha: string; id: string };
        const response = await axiosClient.get(
          `/auth?email=${data.email}&senha=${encodeURIComponent(data.senha)}`
        );

        if (response.status === 200) {
          navigation.navigate('Home', { UserId: data.id });
        } else {
          navigation.navigate('AccessPortal');
        }
      } catch (error) {
        console.log(error);

        // Nenhuma informação de usuario foi encontada no aparelho
        navigation.navigate('AccessPortal');
      }
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <Center flex={1} background='white'>
        <Logo noMargin full />
      </Center>
    </>
  );
}
