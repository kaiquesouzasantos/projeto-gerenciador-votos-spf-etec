// React e componentes
import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import FormTextError from '../components/FormTextError';
import InputField from '../components/InputField';

// Bibliotecas de terceiros
import { useFonts } from 'expo-font';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as zod from 'zod';
import {
  Box,
  Text,
  StatusBar,
  VStack,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'native-base';

// Tipos e constantes
import { InputProps } from './Login';
import Heading from '../components/Heading';
import { RootStackParamList } from '../../App';

import { axiosClient } from '../libs/axios';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface IRegisterProps {
  navigation: LoginScreenNavigationProp;
}

const RegisterFormSchema = zod.object({
  nome: zod
    .string()
    .min(5, { message: 'Informe seu nome completo' })
    .regex(
      /^[a-zA-ZÀ-ÿ]+([\-']{1}[a-zA-ZÀ-ÿ]+)*([\s]{1}[a-zA-ZÀ-ÿ]+([\-']{1}[a-zA-ZÀ-ÿ]+)*)*$/,
      {
        message:
          'O nome deve conter apenas letras e espaços, começando com uma letra maiúscula e sem números ou caracteres especiais.',
      }
    ),
  email: zod.string().email({ message: 'Informe um e-mail válido!' }),
  senha: zod
    .string()
    .min(8, { message: 'Senha muito curta' })
    .regex(/[a-zA-Z]/, { message: 'A senha precisa ter ao menos uma letra!' })
    .regex(/\d/, { message: 'A senha precisa ter ao menos um numero' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message:
        'A senha precisa ter ao menos um dos seguintes carateres epeciais: [!@#$%^&*(),.?":{}|<>]',
    }),
});

type IFormData = zod.infer<typeof RegisterFormSchema>;

export default function Login({ navigation }: IRegisterProps) {
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  });

  const PasswordInputRef = useRef<InputProps>(null);
  const EmailInputRef = useRef<InputProps>(null);

  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      nome: '',
      senha: '',
    },
  });

  async function onSubmit({ email, nome, senha }: IFormData) {
    setIsFormLoading(true);
    try {
      const result = await axiosClient.post('professor/save', {
        nome,
        email,
        senha,
      });
      if (result.status === 201) {
        try {
          await AsyncStorage.setItem(
            '@loggedUserData',
            JSON.stringify({
              nome,
              email,
              senha,
              id: result.data.id,
            })
          );

          navigation.navigate('Home', { UserId: result.data.id });
          console.log('Informaçoes do usuario salvas no aparelho');
        } catch (error) {
          console.log('Erro ao salvar informaçoes no aparelho', error);
        }
      }
    } catch (error) {
      if (error.request.status === 409) {
        setError('email', { message: 'Este email já esta sendo usado!' });
      }
      console.log(error.request);
    }
    setIsFormLoading(false);
  }

  function changeFocusToPasswordInput() {
    PasswordInputRef.current.focus();
  }

  function changeFocusToEmailInput() {
    EmailInputRef.current.focus();
  }

  function redirectUserToLoginPage() {
    navigation.navigate('Login');
  }

  if (!fontsLoaded) {
    return <Text>Loading Fonts...</Text>;
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        flex={1}
        px={10}
        background='white'
      >
        <ScrollView>
          <Logo />
          <Heading>Criar conta</Heading>
          <Text fontFamily='Montserrat-Medium' fontSize='md' mb={16}>
            Crie sua conta para continuar
          </Text>
          <VStack flexDir='column' space={6}>
            <Controller
              control={control}
              name='nome'
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  iconName='person'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Nome completo'
                  returnKeyType='next'
                  onSubmitEnding={changeFocusToEmailInput}
                />
              )}
            />
            {errors.nome && (
              <FormTextError messageError={errors.nome.message} />
            )}
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  iconName='mail'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='E-mail'
                  returnKeyType='next'
                  onSubmitEnding={changeFocusToPasswordInput}
                  ref={EmailInputRef}
                />
              )}
            />
            {errors.email && (
              <FormTextError messageError={errors.email.message} />
            )}
            <Controller
              control={control}
              name='senha'
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  iconName='lock'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='Senha'
                  ref={PasswordInputRef}
                  type='password'
                />
              )}
            />
            {errors.senha && (
              <FormTextError messageError={errors.senha.message} />
            )}
          </VStack>
          <MyButton
            text='CRIAR CONTA'
            onPress={handleSubmit(onSubmit)}
            loading={isFormLoading}
            disabled={isFormLoading}
            icon
          />
          <Box flex={1}></Box>
          <Pressable my={'10'} onPress={redirectUserToLoginPage}>
            <Text
              background='yellow.100'
              textAlign='center'
              fontFamily='Montserrat-Medium'
            >
              Já tem uma conta?{' '}
              <Text color='red.500' fontFamily='Montserrat-Bold'>
                Entrar
              </Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
