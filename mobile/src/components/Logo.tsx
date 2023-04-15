// React e componentes
import React, { memo } from 'react';

// Bibliotecas de terceiros
import { Center, Image } from 'native-base';

interface ILogoProps {
  noMargin?: boolean;
  full?: boolean;
}

function Logo({ noMargin = false, full = false }: ILogoProps) {
  return (
    <Center w='full' h={full ? 'full' : 40} mt={noMargin ? 0 : 10}>
      <Image
        source={require('../../assets/cps-logo.png')}
        alt='CPS icon'
        w={full ? '100%' : 40}
        h={full ? '100%' : 40}
        resizeMode={full ? 'contain' : 'cover'}
      />
    </Center>
  );
}

export default memo(Logo);
