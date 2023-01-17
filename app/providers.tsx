'use client';

import { ColorScheme, ColorSchemeProvider, Paper } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

function Providers({ children }: ReactChildren) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <div>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        {children}
      </ColorSchemeProvider>
    </div>
  );
}

export default Providers;
