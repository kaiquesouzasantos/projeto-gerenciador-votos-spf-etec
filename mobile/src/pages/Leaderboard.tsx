import { View, Icon, FlatList, Text, Spinner } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../libs/axios';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Logo from '../components/Logo';
import Heading from '../components/Heading';

import { AxiosResponseClassificacao } from '../interfaces/classificacao';
import LeaderboardListItem from '../components/LeaderboardListItem';
import { useFocusEffect } from '@react-navigation/native';
import { IClassificacao } from '../interfaces/classificacao';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ILeaderBoardProps {
  navigation: LoginScreenNavigationProp;
}

interface IleaderboardData {
  className: string;
  classGrade: number;
}

export default function Leaderboard({ navigation }: ILeaderBoardProps) {
  const [leaderboardData, setLeaderboardData] = useState<IleaderboardData[]>(
    []
  );
  const [isLeaderboardRefreshing, setIsLeaderboardRefreshing] = useState(false);

  const queryClient = useQueryClient();

  async function fetchLeaderboard() {
    const { data } = (await axiosClient.get(
      'classificacao'
    )) as AxiosResponseClassificacao;
    return data;
  }

  async function logout() {
    await AsyncStorage.removeItem('@loggedUserData');
    navigation.navigate('AccessPortal');
  }

  /* Busca a classificação cacheada caso exista usando a chave ['classificacao']
  // Caso nao exista nada cacheado faz uma nova busca da classificação
  // Por fim adiciona a informação da classificacao no estado leaderboardData
  */
  const fetchLeaderboardCached = async () => {
    try {
      let data = queryClient.getQueryData([
        'classificacao',
      ]) as IClassificacao[];

      if (!data) {
        data = await queryClient.fetchQuery({
          queryFn: fetchLeaderboard,
          queryKey: ['classificacao'],
        });
      }

      const leaderBoards = data.map((sala) => ({
        className: sala.sala.nome,
        classGrade: sala.nota,
      }));

      setLeaderboardData([...leaderBoards]);
    } catch (error) {
      console.log(error);
    }
  };

  // Busca por uma  nova classificação depois adiciona a informação da classificacao no estado leaderboardData
  // Também altera o estado isLeaderboardRefreshing para mostrar o icone de atualizando na lista
  const fetchNewLeaderboard = async () => {
    setIsLeaderboardRefreshing(true);
    try {
      const data = await queryClient.fetchQuery({
        queryFn: fetchLeaderboard,
        queryKey: ['classificacao'],
      });

      const leaderBoards = data.map((sala) => ({
        className: sala.sala.nome,
        classGrade: sala.nota,
      }));

      setLeaderboardData([...leaderBoards]);
    } catch (error) {
      console.log(error);
    }
    setIsLeaderboardRefreshing(false);
  };

  /* Busca a classificação cacheada caso exista
  // Executada na primeira renderização do componente
  */
  useEffect(() => {
    fetchLeaderboardCached();
  }, []);

  // Busca por uma  nova classificação sempre que a rota é acessada
  useFocusEffect(
    useCallback(() => {
      fetchNewLeaderboard();
    }, [])
  );

  return (
    <View flex={1} background='white' px={10} pb={5}>
      <Icon
        as={MaterialIcons}
        name='logout'
        size={10}
        color='red.500'
        onPress={logout}
        position='absolute'
        right={10}
        top={10}
        zIndex={9999}
      />
      <Logo />
      <Heading>Classificação</Heading>
      <View mb={4} />
      {leaderboardData && (
        <>
          <FlatList
            onRefresh={fetchNewLeaderboard}
            refreshing={isLeaderboardRefreshing}
            data={leaderboardData.sort((a, b) => b.classGrade - a.classGrade)}
            renderItem={({ item, index }) => (
              <LeaderboardListItem
                className={item.className}
                grade={item.classGrade}
                position={index}
              />
            )}
          />
        </>
      )}
    </View>
  );
}
