// React e componentes
import React, { memo } from 'react';

// Bibliotecas de terceiros
import { Pressable, HStack, Icon, Text, Spinner } from 'native-base';
import { AntDesign } from '@expo/vector-icons';

interface IMyButtonProps {
  text: string;
  onPress: () => void;
  loading: boolean;
  disabled: boolean;
  icon?: boolean;
  style?: 'outline' | 'fill';
}

function MyButton({
  text,
  onPress,
  loading,
  disabled,
  icon = false,
  style = 'fill',
}: IMyButtonProps) {
  return (
    <Pressable
      w='full'
      alignItems='flex-end'
      mt={8}
      onPress={onPress}
      disabled={disabled}
      background={style === 'fill' ? '#cc0c0c' : 'transparent'}
      rounded='full'
      _pressed={{
        backgroundColor: style === 'fill' ? '#9e0909' : '#ebe8e8',
      }}
    >
      <HStack
        rounded='full'
        borderColor={style === 'fill' ? 'transparent' : '#cc0c0c'}
        borderWidth={style === 'fill' ? 0 : 2}
        w={'full'}
        h={12}
        backgroundColor='blueGray.100'
        alignItems='center'
        justifyContent='center'
        space={2}
        position='relative'
        background='transparent'
      >
        {loading ? (
          <>
            <Text color='white' fontFamily='Montserrat-Bold' zIndex={999}>
              Carregando
            </Text>
            <Spinner color='white' size={25} />
          </>
        ) : (
          <>
            <Text
              color={style === 'fill' ? 'white' : '#cc0c0c'}
              fontFamily='Montserrat-Bold'
              zIndex={999}
            >
              {text}
            </Text>
            {icon && (
              <Icon
                as={AntDesign}
                name='arrowright'
                size={5}
                color={style === 'fill' ? 'white' : '#cc0c0c'}
              />
            )}
          </>
        )}
      </HStack>
    </Pressable>
  );
}

export default memo(
  MyButton,
  (prevProps, nextProps) =>
    prevProps.text === nextProps.text && prevProps.onPress === nextProps.onPress
);
