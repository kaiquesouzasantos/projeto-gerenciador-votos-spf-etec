// React e componentes
import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Heading from '../components/Heading';
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import InputField from '../components/InputField';
import FormTextError from '../components/FormTextError';

// Bibliotecas de terceiros
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  IInputProps,
} from 'native-base';

// Tipos e constantes
import { RootStackParamList } from '../../App';
import { AxiosResponseProfessor } from '../interfaces/professor';

import { axiosClient } from '../libs/axios';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export interface InputProps extends IInputProps {
  focus: () => void;
}

interface ILoginProps {
  navigation: LoginScreenNavigationProp;
}

const LoginFormSchema = zod.object({
  email: zod.string().email({ message: 'Informe um e-mail válido!' }),
  senha: zod.string().nonempty({ message: 'Você deve informar sua senha!' }),
});

type IFormData = zod.infer<typeof LoginFormSchema>;

export default function Login({ navigation }: ILoginProps) {
  const passwordInputRef = useRef<InputProps>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  async function onSubmit(formData: IFormData) {
    setIsFormLoading(true);
    try {
      const result = await axiosClient.get(
        `professor/auth?email=${formData.email}&senha=${encodeURIComponent(
          formData.senha
        )}`
      );
      if (result.status === 200) {
        const { data } = (await axiosClient.get(
          `professor/email?email=${formData.email}`
        )) as AxiosResponseProfessor;

        await AsyncStorage.setItem('@loggedUserData', JSON.stringify(data));

        navigation.navigate('Home', { UserId: data.id });
      }
      if (result.status === 204) {
        setError('senha', { message: 'Credenciais inválidas' });
      }
      if (result.status === 500) {
        setError('senha', {
          message: 'ocorreu um erro.Tente novamente mais tarde',
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsFormLoading(false);
  }

  function changeFocusToPasswordInput() {
    passwordInputRef?.current.focus();
  }

  function redirectUserToRegisterPage() {
    navigation.navigate('Register');
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
          <Heading>Entrar</Heading>
          <Text fontFamily='Montserrat-Medium' fontSize='md' mb={16}>
            Entre na sua conta para continuar
          </Text>
          <VStack flexDir='column' space={errors.email || errors.senha ? 2 : 6}>
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
                  onSubmitEnding={changeFocusToPasswordInput}
                  returnKeyType='next'
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
                  placeholder='Senha'
                  returnKeyType='next'
                  onBlur={onBlur}
                  value={value}
                  onChangeText={onChange}
                  iconName='lock'
                  type='password'
                  ref={passwordInputRef}
                />
              )}
            />
            {errors.senha && (
              <FormTextError messageError={errors.senha.message} />
            )}
          </VStack>
          <Pressable my={2}>
            <Text
              w='full'
              textAlign='right'
              fontFamily='Montserrat-Medium'
              mt={1}
              color='red.500'
            >
              Esqueceu a senha?
            </Text>
          </Pressable>
          <MyButton
            text='LOGIN'
            onPress={handleSubmit(onSubmit)}
            disabled={isFormLoading}
            loading={isFormLoading}
            icon
          />
          <Box flex={1} bgColor={'amber.300'}></Box>
          <Pressable my={'10'} onPress={redirectUserToRegisterPage}>
            <Text
              background='yellow.100'
              textAlign='center'
              fontFamily='Montserrat-Medium'
            >
              Não tem uma conta?{' '}
              <Text color='red.500' fontFamily='Montserrat-Bold'>
                Registrar
              </Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
