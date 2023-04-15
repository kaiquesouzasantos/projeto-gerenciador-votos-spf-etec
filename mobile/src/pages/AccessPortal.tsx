// React e componentes
import Logo from '../components/Logo';
import MyButton from '../components/MyButton';
import Heading from '../components/Heading';

// Bibliotecas de terceiros
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, Center, Box } from 'native-base';

// Tipos e constantes
import { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ILoginProps {
  navigation: LoginScreenNavigationProp;
}

export default function AccessPortal({ navigation }: ILoginProps) {
  function redirectUserToRegisterPage() {
    navigation.navigate('Register');
  }

  function redirectUserToReportPage() {
    navigation.navigate('Reports');
  }

  return (
    <Center flex={1} bgColor='white' px={10}>
      <Logo />
      <Box h={10}></Box>
      <Heading>Selecione seu perfil de usuário</Heading>
      <Text fontFamily='Montserrat-Medium' fontSize='md' mb={10}>
        Escolha seu tipo de usuário e tenha acesso a recursos exclusivo
      </Text>

      <MyButton
        text='Entrar como Professor'
        icon
        loading={false}
        disabled={false}
        onPress={redirectUserToRegisterPage}
      />
      <MyButton
        text='Entrar como Aluno'
        icon
        loading={false}
        disabled={false}
        onPress={redirectUserToReportPage}
        style='outline'
      />
    </Center>
  );
}
