import { createContext, useContext, ReactNode, useMemo } from 'react';
import {
  useMutation,
  useQuery,
  QueryClientProvider,
  QueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import Review from '@/data/Review';
import { useError } from '@/context/ErrorContext';

interface IReviewContext {
  reviews: Review[];
  hasMoreReviews: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => void;
  submitReview: UseMutationResult<any, Error, Review, any>;
}

const ReviewContext = createContext<IReviewContext | null>(null);

const PAGE_SIZE = 10;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

const fetchReviews = async (): Promise<Review[]> => {
  const response = await fetch('/api/reviews');
  if (!response.ok) {
    throw new Error('Failed to fetch reviews.');
  }
  return response.json();
};
export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  const { setError } = useError();

  const {
    data: reviews = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<Review[], Error>({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 5,
    retry: 2,
    placeholderData: prevData => prevData ?? [],
  });

  const submitReview = useMutation({
    mutationFn: async (newReview: Review) => {
      try {
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newReview),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit review.');
        }
        return response.json();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Something went wrong while submitting the review.';
        setError(errorMessage);
        throw error;
      }
    },

    onMutate: async newReview => {
      await queryClient.cancelQueries({ queryKey: ['reviews'] });

      const previousReviews = queryClient.getQueryData<Review[]>(['reviews']);

      queryClient.setQueryData(['reviews'], (old: Review[] = []) => [
        { ...newReview, id: Date.now() },
        ...old,
      ]);

      return { previousReviews };
    },

    onError: (_error, _newReview, context: any) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(['reviews'], context.previousReviews);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.refetchQueries({ queryKey: ['reviews'] });
    },
  });

  const hasMoreReviews = reviews.length === PAGE_SIZE;
  const value = useMemo(
    () => ({
      reviews,
      hasMoreReviews,
      isLoading,
      isError,
      isFetching,
      submitReview,
      refetch,
    }),
    [
      reviews,
      hasMoreReviews,
      isLoading,
      isError,
      isFetching,
      submitReview,
      refetch,
    ],
  );

  return (
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};

export const ReviewQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReviewProvider>{children}</ReviewProvider>
    </QueryClientProvider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
