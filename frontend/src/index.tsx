import React from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './components/HomePage/HomePage';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <HomePage />
  </QueryClientProvider>
);
