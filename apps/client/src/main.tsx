import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components/macro';
import App from './app/app';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    font-family: 'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  }

  body {
    background: #f5f5f5;
    margin: 0;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
