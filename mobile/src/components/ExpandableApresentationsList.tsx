// React e componentes
import React, { useState } from 'react';
import ReportField from './ReportField';
import ExapandableRatingList from './ExapandableRatingList';

// Bibliotecas de terceiros
import { Box, Text, Pressable, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

// Constantes e tipos
import { ApresentacaoFull } from '../interfaces/apresentacao';

interface IExpandableApresentationsListProps {
  data: ApresentacaoFull;
}

export default function ExpandableApresentationsList({
  data,
}: IExpandableApresentationsListProps) {
  const [isOppen, setIsOppen] = useState(false);

  return (
    <Box my={2} justifyContent='center'>
      <Pressable
        flexDir='row'
        justifyContent='space-between'
        onPress={() => setIsOppen((open) => !open)}
        p={2}
        borderWidth={1}
        borderRadius={5}
        borderColor='red.500'
      >
        <Text fontFamily='Montserrat-Bold'>{data.nome}</Text>
        <Box
          w={7}
          h={7}
          background='red.500'
          rounded='full'
          alignItems='center'
          justifyContent='center'
        >
          <Icon
            as={Ionicons}
            name={isOppen ? 'ios-chevron-up' : 'ios-chevron-down'}
            size={7}
            color='white'
          />
        </Box>
      </Pressable>
      <Box pl={3}>
        {isOppen ? (
          <>
            {data.avaliacoes.length > 0 ? (
              <>
                <ReportField
                  title='Nota da apresentação'
                  content={data.nota.toString()}
                />
                {data.avaliacoes.map((avaliacao, index) => (
                  <ExapandableRatingList
                    data={avaliacao}
                    id={index}
                    key={avaliacao.id}
                  />
                ))}
              </>
            ) : (
              <Text maxW='100%' fontFamily='Montserrat-Medium' color='red.400'>
                Sem avaliações por enquanto
              </Text>
            )}
          </>
        ) : null}
      </Box>
    </Box>
  );
}
