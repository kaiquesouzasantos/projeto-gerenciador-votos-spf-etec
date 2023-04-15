// React e componentes
import React, { ReactNode } from 'react';

// Bibliotecas de terceiros
import { Heading as NativeBaseHeading } from 'native-base';

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <NativeBaseHeading fontFamily='Montserrat-Bold' fontSize='3xl' w='full'>
      {children}
    </NativeBaseHeading>
  );
}
