import { View, Text, Icon } from 'native-base';
import React, { memo } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface IInfoProps {
  min?: number;
  max: number;
}

function GradeLimits({ max, min = 0 }: IInfoProps) {
  return (
    <View
      w='full'
      bgColor='#e0f2fe'
      flexDir='row'
      alignItems='center'
      justifyItems='flex-start'
      rounded='sm'
    >
      <Icon as={AntDesign} name='infocirlceo' mx={2} color='#0284c7' />
      <View flex={1} background='transparent'>
        <Text color='#0284c7'>
          Avalie esta apresentação com uma nota entre {min} e {max} pontos
        </Text>
      </View>
    </View>
  );
}

export default memo(
  GradeLimits,
  (oldProps, nextProps) =>
    oldProps.min === nextProps.min && oldProps.max === nextProps.max
);
