import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorProvider } from '@/context/ErrorContext';
import { ReviewQueryProvider } from '@/context/ReviewContext';

const queryClient = new QueryClient();

export const TestProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ErrorProvider>
      <ReviewQueryProvider>{children}</ReviewQueryProvider>
    </ErrorProvider>
  </QueryClientProvider>
);
