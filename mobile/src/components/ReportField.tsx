// React e componentes
import React from 'react';

// Bibliotecas de terceiros
import { Box, Text } from 'native-base';

interface IReportFieldProps {
  title: string;
  content: string;
}

export default function ReportField({ content, title }: IReportFieldProps) {
  return (
    <Box py={2} background='gray.100' rounded='md' my={2}>
      <Text fontFamily='Montserrat-SemiBold' pl={2}>
        {title}: <Text fontFamily='Montserrat-Medium'>{content}</Text>
      </Text>
    </Box>
  );
}
