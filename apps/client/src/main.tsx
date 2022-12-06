import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { StiggProvider } from '@stigg/react-sdk';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import config from './app/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StiggProvider
      apiKey={config.stiggApiKey}
      theme={{
        layout: {
          planMinWidth: '332px',
          descriptionMinHeight: '60px',
          switchBottomSpacing: '20px',
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StiggProvider>
  </StrictMode>
);
