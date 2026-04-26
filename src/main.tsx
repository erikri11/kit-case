import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider, ThemeProvider } from '@mui/material';
import { GoogleOAuthProvider } from "@react-oauth/google";

import '@shared/i18n/i18n';
import '@shared/styles/variables.scss';
import '@shared/styles/global';

import { theme } from '@shared/theme/mui/theme';
import { AppProviders } from './app/providers/AppProviders';
import App from './App';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error("Missing VITE_GOOGLE_CLIENT_ID");
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
        <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme} defaultMode="system">
          <AppProviders>
            <App />
          </AppProviders>
        </ThemeProvider>
      </StyledEngineProvider>
      </GoogleOAuthProvider>
      
    </BrowserRouter>
  </StrictMode>
);
