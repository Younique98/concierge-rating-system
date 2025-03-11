import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

//  Mock IntersectionObserver
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

global.queryClient = new QueryClient();
global.QueryClientProvider = QueryClientProvider;
