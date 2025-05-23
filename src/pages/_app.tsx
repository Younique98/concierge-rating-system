import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/NavBar';
import Head from 'next/head';
import { ErrorProvider } from '@/context/ErrorContext';
import { ReviewQueryProvider } from '@/context/ReviewContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 30,
      staleTime: 1000 * 60 * 10,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <Head>
          <title>Point.me Reviews - Award Booking Service</title>
        </Head>
        <Navbar />
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
        <ReviewQueryProvider>
          <Component {...pageProps} />
        </ReviewQueryProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
}
