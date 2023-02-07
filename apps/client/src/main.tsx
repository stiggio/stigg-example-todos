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
      baseUri={'https://api-staging.stigg.io/graphql'}
      theme={{
        layout: {
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
