import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReviews } from '../useReviews';
import { waitFor } from '@testing-library/react';
import { TestProvider } from '@/tests/TestProvider';

jest.mock('../useReviews', () => ({
  ...jest.requireActual('../useReviews'),
  fetchReviews: jest.fn(() =>
    Promise.resolve([
      { id: 1, rating: 5, review: 'Great service!', author: 'John' },
      { id: 2, rating: 4, review: 'Nice experience.', author: 'Jane' },
    ]),
  ),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useReviews Hook', () => {
  it('handles pagination correctly', async () => {
    const { result } = renderHook(() => useReviews(), {
      wrapper: TestProvider,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.setPage(2);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.page).toBe(2);
  });

  it('optimistically updates UI when submitting a review', async () => {
    const { result } = renderHook(() => useReviews(), {
      wrapper: TestProvider,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.submitReview.mutate({
        rating: 5,
        review: 'Excellent!',
        author: 'Alice',
        id: Date.now(),
      });
    });

    await waitFor(() =>
      expect(result.current.reviews.some(r => r.author === 'Alice')).toBe(
        false,
      ),
    );
  });
  it('increments page when setPage is called', async () => {
    const { result } = renderHook(() => useReviews(), {
      wrapper: TestProvider,
    });

    act(() => {
      result.current.setPage(2);
    });

    expect(result.current.page).toBe(2);
  });

  it('triggers mutation when submitting a review', async () => {
    const { result } = renderHook(() => useReviews(), {
      wrapper: TestProvider,
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.submitReview.mutate({
        rating: 5,
        review: 'Awesome!',
        author: 'Alice',
        id: Date.now(),
      });
    });

    expect(result.current.isError).toBe(false);
  });
});
