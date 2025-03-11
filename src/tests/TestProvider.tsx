import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorProvider } from '@/context/ErrorContext';

const queryClient = new QueryClient();

export const TestProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>{children}</ErrorProvider>
  </QueryClientProvider>
);
