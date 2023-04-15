// React e componentes
import React, { memo } from 'react';

// Bibliotecas de terceiros
import { Text } from 'native-base';

interface IFormTextErrorProps {
  messageError: string;
}

function FormTextError({ messageError }: IFormTextErrorProps) {
  return (
    <Text color='#FF0000' fontFamily='Montserrat-SemiBold'>
      {messageError}
    </Text>
  );
}

export default memo(
  FormTextError,
  (prevProps, nextProps) => prevProps.messageError === nextProps.messageError
);
