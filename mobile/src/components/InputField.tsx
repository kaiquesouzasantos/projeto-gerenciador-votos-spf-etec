// React e componentes
import React, { forwardRef, useState } from 'react';

// Bibliotecas de terceiros
import { Icon, Input } from 'native-base';
import { MaterialIcons, Feather } from '@expo/vector-icons';

interface IInputFieldProps {
  placeholder: string;
  iconName?: string;
  returnKeyType?: 'next';
  onSubmitEnding?: () => void;
  onChangeText?: (text: string) => void;
  onBlur: () => void;
  value: string | number;
  type?: 'password' | 'number';
  multLine?: boolean;
}

const InputField = forwardRef(
  (
    {
      iconName,
      onBlur,
      placeholder,
      value,
      onChangeText,
      onSubmitEnding,
      returnKeyType,
      type,
      multLine = false,
    }: IInputFieldProps,
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputType =
      type === 'password' ? (isPasswordVisible ? 'text' : 'password') : 'text';
    return (
      <Input
        type={inputType}
        placeholder={placeholder}
        InputLeftElement={
          iconName && (
            <Icon as={MaterialIcons} name={iconName} size='md' ml={2} />
          )
        }
        InputRightElement={
          type === 'password' && (
            <Icon
              as={Feather}
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size='md'
              mr={2}
              onPress={() => setIsPasswordVisible((prev) => !prev)}
            />
          )
        }
        placeholderTextColor='gray.800'
        fontFamily='Montserrat-Medium'
        _focus={{
          borderColor: 'red.500',
          backgroundColor: 'transparent',
        }}
        returnKeyType={returnKeyType ? 'next' : 'go'}
        onSubmitEditing={onSubmitEnding}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={typeof value === 'number' ? value.toString() : value}
        keyboardType={type === 'number' ? 'decimal-pad' : 'default'}
        ref={ref}
        multiline={multLine}
        numberOfLines={multLine ? 10 : 1}
        textAlignVertical={multLine ? 'top' : 'center'}
      />
    );
  }
);

export default InputField;
