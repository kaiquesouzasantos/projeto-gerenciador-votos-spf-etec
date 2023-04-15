// Bibliotecas de terceiros
import { extendTheme } from 'native-base';

export const customTheme = extendTheme({
  colors: {
    red: {
      500: '#b20000',
    },
  },
});

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
