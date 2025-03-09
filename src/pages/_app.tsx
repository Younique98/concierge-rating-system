import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            padding: '12px',
            borderRadius: '8px',
          },
          success: {
            style: { background: '#22c55e' },
          },
          error: {
            style: { background: '#ef4444' },
          },
        }}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
