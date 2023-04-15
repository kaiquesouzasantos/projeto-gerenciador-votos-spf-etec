// React e componentes
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import Heading from '../components/Heading';
import ExpandableApresentationsList from '../components/ExpandableApresentationsList';

// Bibliotecas de terceiros
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Box, ScrollView, Text, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Constantes e tipos
import { AxiosReponseSalaAll } from '../interfaces/sala';
import { Sala } from '../interfaces/sala';
import { RootStackParamList } from '../../App';
import { Relatorio } from '../interfaces/relatorio';

import { axiosClient } from '../libs/axios';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface IReportsProps {
  navigation: LoginScreenNavigationProp;
}

export default function Reports({ navigation }: IReportsProps) {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [relatorio, setRelatorio] = useState<Relatorio>();

  useEffect(() => {
    (async () => {
      const response = (await axiosClient.get(
        'sala/all'
      )) as AxiosReponseSalaAll;
      setSalas(response.data);
    })();
  }, []);

  async function handleSelectDropdownSala(salaSelecionada: string) {
    const sala = salas.find((sala) => sala.nome === salaSelecionada);
    try {
      const response = await axiosClient.get(`relatorio?salaId=${sala.id}`);
      setRelatorio(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    await AsyncStorage.removeItem('@loggedUserData');
    navigation.navigate('AccessPortal');
  }

  return (
    <ScrollView flex={1} background='white' px={10} pb={5}>
      <Icon
        as={MaterialIcons}
        name='logout'
        size={10}
        color='red.500'
        onPress={logout}
        position='absolute'
        right={0}
        top={10}
        zIndex={9999}
      />
      <Logo />
      <Heading>Relatórios</Heading>
      <Box w='full' h={10}></Box>
      <SelectDropdown
        buttonStyle={styles.select}
        searchPlaceHolder='Procure uma sala'
        defaultButtonText='Selecione uma sala'
        search
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        onSelect={handleSelectDropdownSala}
        data={salas.map((sala) => sala.nome)}
        renderDropdownIcon={(isOpen) => {
          return (
            <Ionicons
              name={isOpen ? 'ios-chevron-up' : 'ios-chevron-down'}
              size={24}
              color='black'
            />
          );
        }}
        renderSearchInputLeftIcon={() => {
          return <AntDesign name={'search1'} color={'#444'} size={18} />;
        }}
        buttonTextStyle={styles.textFont}
        rowTextStyle={styles.textFont}
      />
      {relatorio && (
        <>
          <Text fontFamily='Montserrat-Bold' fontSize='xl' mt={5}>
            Nota da sala:{' '}
            <Text color='red.500'>
              {relatorio.nota ? relatorio.nota : 'N/A'}
            </Text>
          </Text>
          <>
            <Text fontFamily='Montserrat-Bold' fontSize='xl' mb={4} mt={5}>
              Avaliações
            </Text>
            {relatorio.apresentacoes.map((apresentacao) => (
              <ExpandableApresentationsList
                data={apresentacao}
                key={apresentacao.id}
              />
            ))}
          </>
        </>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  select: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#b20000',
    borderRadius: 5,
    marginTop: 0,
  },
  textFont: {
    fontFamily: 'Montserrat-Medium',
  },
});
