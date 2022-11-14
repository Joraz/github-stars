import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';

import { App, client } from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <App />
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
