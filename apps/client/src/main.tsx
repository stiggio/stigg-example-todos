import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { StiggProvider } from '@stigg/react-sdk';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { theme } from './theme';
import config from './app/config';
import { GlobalStyle } from './GlobalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StiggProvider
      apiKey={config.stiggApiKey}
      theme={{
        layout: {
          planMinWidth: '330px',
          descriptionMinHeight: '60px',
          switchBottomSpacing: '20px',
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </StiggProvider>
  </StrictMode>
);
