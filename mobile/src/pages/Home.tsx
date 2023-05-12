// React e componentes
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import MyButton from '../components/MyButton';
import InputField from '../components/InputField';
import FormTextError from '../components/FormTextError';
import Logo from '../components/Logo';
import Heading from '../components/Heading';
import GradeLimits from '../components/GradeLimits';

// Bibliotecas de terceiros
import {
  Text,
  StatusBar,
  KeyboardAvoidingView,
  VStack,
  ScrollView,
  Box,
  Icon,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import SelectDropdown from 'react-native-select-dropdown';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

// Tipos e constantes
import { AxiosReponseApresentacaoAll } from '../interfaces/apresentacao';
import { AxiosReponseSalaAll } from '../interfaces/sala';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

import { axiosClient } from '../libs/axios';
import { axiosProfessor } from '../libs/axiosProfessor';
import { Limites } from '../interfaces/limites';

const avaliacaoFormSchema = zod.object({
  nota: zod.string().nonempty({ message: 'Campo obrigatório' }),
  avaliacao: zod.string().nonempty({ message: 'Campo obrigatório' }),
});

type IFormData = zod.infer<typeof avaliacaoFormSchema>;

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface IHomeProps {
  navigation: LoginScreenNavigationProp;
}

export default function Home({ navigation }: IHomeProps) {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [salas, setSalas] = useState([]);
  const [idSalaSelecionda, setIdSalaSelecionda] = useState('');
  const [selectedApresentationId, setSelectedApresentationId] = useState('');
  const [selectedApresentationName, setSelectedApresentationName] =
    useState('');
  const [ApresentationError, setApresentationError] = useState('');
  const [apresentations, setApresentations] = useState<
    {
      id: string;
      nome: string;
      sala: string;
    }[]
  >([]);
  const [limites, setLimites] = useState<Limites | {}>({});
  limites[''];
  const apresentatioDropdownRef = useRef<SelectDropdown>(null);
  const salaDropdownRef = useRef<SelectDropdown>(null);

  const { params } = useRoute() as { params: { UserId: string } };

  useEffect(() => {
    //Busca todas as salas
    (async () => {
      const response = (await axiosClient.get(
        'sala/all'
      )) as AxiosReponseSalaAll;
      setSalas(response.data);
    })();

    //Busca todas as apresentaçoes e armazena no estado apresentations
    (async () => {
      const response: AxiosReponseApresentacaoAll = await axiosClient.get(
        'apresentacao/all'
      );
      const apresentacoes = response.data.map((apresentacao) => {
        return {
          id: apresentacao.id,
          nome: apresentacao.nome,
          sala: apresentacao.sala,
        };
      });
      setApresentations([...apresentacoes]);
    })();

    //Busca informaçoes sobre a nota maxima de cada apresentação e armazena no estado limites
    (async () => {
      const response = await axiosClient.get('apresentacao/limites');
      setLimites(response.data);
    })();
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(avaliacaoFormSchema),
  });

  const onSubmit = async ({ avaliacao, nota }: IFormData) => {
    setIsFormLoading(true);

    if (
      selectedApresentationId &&
      Number(nota) >= 0 &&
      Number(nota) <= limites[selectedApresentationName]
    ) {
      try {
        const response = await axiosProfessor.post('avaliacao/save', {
          avaliacao,
          nota: Number(nota),
          apresentacao: selectedApresentationId,
          professor: params.UserId,
        });

        if (response.status === 201) {
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Sucesso',
            textBody: 'A avaliação foi registrada com sucesso',
            button: 'OK',
          });
        }
        reset();
        setSelectedApresentationId('');
        setSelectedApresentationName('');
      } catch (error) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.message;
          const regex = /(\d+\.\d+)/g;
          const matches = errorMessage.match(regex);
          if (matches) {
            const pontos = parseFloat(matches[0]);
            const pontosFormatados = pontos.toFixed(2);
            const mensagemFormatada = errorMessage.replace(
              regex,
              pontosFormatados
            );
            setError('nota', { message: mensagemFormatada });
            setIsFormLoading(false);

            return;
          }
        } else if (error.response.status === 409) {
          if (error.response.data.message == 'AVALIACAO JA ATRIBUIDA') {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Erro',
              textBody: 'Você já avaliou esta apresentação',
              button: 'OK',
            });
            setSelectedApresentationName('');
          } else {
            Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: 'Erro',
              textBody: 'Número de avaliações excedido',
              button: 'OK',
            });
          }
        } else {
          Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: 'Erro',
            textBody: 'Ocorreu um erro. Tente novamente mais tarde',
            button: 'OK',
          });
        }
        setSelectedApresentationId('');
      }
    } else if (!selectedApresentationId) {
      setApresentationError('Selecione uma apresentação!');
    } else if (Number(nota) < 0) {
      setError('nota', {
        message: 'A nota não pode ser menor do que 0 pontos',
      });
    } else if (Number(nota) > limites[selectedApresentationName]) {
      setError('nota', {
        message:
          'A nota não pode ser maior do que ' +
          limites[selectedApresentationName].toFixed(2) + ' pontos'
      });
      setIsFormLoading(false);
      return;
    }

    // Limpa o item selecionado na lista de apresentaçoes
    apresentatioDropdownRef.current.reset();
    setIsFormLoading(false);
    setSelectedApresentationId('');
  };

  function handleSelectDropdownSala(selectedItem: string) {
    const salaSelecionada = salas.find((sala) => sala.nome === selectedItem);
    setIdSalaSelecionda(salaSelecionada.id);
    setSelectedApresentationId('');
    // Limpa o item selecionado na lista de apresentaçoes
    apresentatioDropdownRef.current.reset();
  }

  async function logout() {
    reset();
    setApresentationError('');
    // Limpa o item selecionado na lista de salas
    salaDropdownRef.current.reset();
    await AsyncStorage.removeItem('@loggedUserData');
    navigation.navigate('AccessPortal');
  }
  return (
    <AlertNotificationRoot theme='light'>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          flex={1}
          px={10}
          background='white'
        >
          <ScrollView flex={1}>
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
            <Logo noMargin />
            <Heading>Avaliação</Heading>
            <Text fontFamily='Montserrat-Medium' fontSize='md' mb={10}>
              Avalie as apresentaçoes aqui.
            </Text>

            <SelectDropdown
              data={salas.map((sala) => sala.nome)}
              onSelect={handleSelectDropdownSala}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: '100%',
                height: 45,
                borderRadius: 5,
                backgroundColor: 'transparent',
                borderColor: '#CCC',
                borderWidth: 1,
              }}
              search
              searchPlaceHolder='Busque por uma sala'
              defaultButtonText='Selecione uma sala'
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
              ref={salaDropdownRef}
            />
            <Box w='full' h={6}></Box>
            <SelectDropdown
              data={
                idSalaSelecionda &&
                apresentations
                  .filter(
                    (apresentation) => apresentation.sala == idSalaSelecionda
                  )
                  .map((apresentation) => apresentation.nome)
              }
              onSelect={(selected) => {
                const apresentacaoSelecionada = apresentations
                  .filter(
                    (apresentation) => apresentation.sala === idSalaSelecionda
                  )
                  .find((apresentation) => apresentation.nome === selected);
                setSelectedApresentationId(apresentacaoSelecionada.id);
                setSelectedApresentationName(selected);
                setApresentationError('');
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={{
                width: '100%',
                height: 45,
                borderRadius: 5,
                backgroundColor: 'transparent',
                borderColor: '#CCC',
                borderWidth: 1,
              }}
              search
              searchPlaceHolder='Busque por uma apresentação'
              defaultButtonText='Selecione uma apresentação'
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
              disabled={idSalaSelecionda === ''}
              defaultValue={selectedApresentationId}
              ref={apresentatioDropdownRef}
            />
            {ApresentationError && (
              <FormTextError messageError={ApresentationError} />
            )}

            <VStack flexDir='column' space={6} mt={6}>
              {selectedApresentationName ? (
                <GradeLimits
                  max={Number(limites[selectedApresentationName].toFixed(2))}
                />
              ) : null}

              <Controller
                name='nota'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    placeholder='Nota'
                    returnKeyType='next'
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    iconName='star'
                    type='number'
                  />
                )}
              />
              {errors.nota && (
                <FormTextError messageError={errors.nota.message} />
              )}
              <Controller
                name='avaliacao'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    placeholder='Avaliação'
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    returnKeyType='next'
                    multLine
                  />
                )}
              />
              {errors.avaliacao && (
                <FormTextError messageError={errors.avaliacao.message} />
              )}
            </VStack>

            <MyButton
              text='Enviar'
              disabled={isFormLoading}
              loading={isFormLoading}
              onPress={handleSubmit(onSubmit)}
            />
            <Box w='full' h={10}></Box>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </AlertNotificationRoot>
  );
}
