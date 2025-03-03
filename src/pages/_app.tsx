// pages/_app.tsx
import type { AppProps } from 'next/app';
import { CssBaseline, PaletteOptions, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { palette } from '../theme/palette';
import { typography } from '../theme/typography';

const theme = createTheme({
    palette: palette('dark') as PaletteOptions, // Explicitly cast to PaletteOptions
    typography,
  })

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
