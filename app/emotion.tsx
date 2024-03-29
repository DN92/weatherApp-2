'use client';

import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider, MantineThemeOverride } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';

const theme: MantineThemeOverride = {
  radius: {
    xs: 10,
    sm: 30,
    md: 50,
    lg: 70,
    xl: 90,
  },
};

export default function RootStyleRegistry({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
