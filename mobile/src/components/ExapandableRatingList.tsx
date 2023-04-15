// React e componentes
import React, { useState } from 'react';
import ReportField from './ReportField';

// Bibliotecas de terceiros
import { Box, Text, Pressable, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

// Constantes e tipos
import { Avaliacao } from '../interfaces/Avaliacao';

interface IExapandableRatingListProps {
  data: Avaliacao;
  id: number;
}

export default function ExapandableRatingList({
  data,
  id,
}: IExapandableRatingListProps) {
  const [isOppen, setIsOppen] = useState(false);

  return (
    <Box>
      {data && (
        <Box my={2}>
          <Pressable
            p={2}
            borderWidth={1}
            borderRadius={5}
            borderColor='red.500'
            onPress={() => setIsOppen((open) => !open)}
            flexDir='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Box flexDir='row' alignItems='center'>
              <Text fontFamily='Montserrat-Bold'>Avaliação {id + 1}</Text>
            </Box>
            <Box
              w={5}
              h={5}
              background='red.500'
              rounded='full'
              alignItems='center'
              justifyContent='center'
            >
              <Icon
                as={Ionicons}
                name={isOppen ? 'ios-chevron-up' : 'ios-chevron-down'}
                size={4}
                color='white'
              />
            </Box>
          </Pressable>
          <Box pl={3}>
            {isOppen && (
              <>
                <ReportField title='Nota' content={data.nota.toString()} />
                <ReportField title='Avaliação' content={data.avaliacao} />
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
