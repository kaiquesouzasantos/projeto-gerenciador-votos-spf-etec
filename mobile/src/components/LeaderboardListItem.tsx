import { View, Text } from 'native-base';
import React from 'react';

interface ILeaderboardListItemProps {
  position: number;
  className: string;
  grade: number;
}

export default function LeaderboardListItem({
  className,
  grade,
  position,
}: ILeaderboardListItemProps) {
  return (
    <View
      my={1}
      w='full'
      h={12}
      rounded='md'
      borderWidth={1}
      borderColor='gray.300'
      bgColor='gray.100'
      flexDir='row'
      px={4}
      alignItems='center'
      justifyContent='flex-start'
      position='relative'
    >
      <Text fontSize='lg' fontWeight='bold' mr={4}>
        {position + 1}
      </Text>
      <Text fontSize='lg'>{className}</Text>
      <Text position='absolute' right={4} fontSize='lg' fontWeight='bold'>
        {grade}
      </Text>
    </View>
  );
}
