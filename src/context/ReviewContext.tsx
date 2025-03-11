import { createContext, useContext, ReactNode, useMemo } from 'react';
import {
  useMutation,
  useQuery,
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import Review from '@/data/Review';
import { useError } from '@/context/ErrorContext';

interface IReviewContext {
  reviews: Review[];
  hasMoreReviews: boolean;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  addReview: (newReview: Review) => void;
}

const ReviewContext = createContext<IReviewContext | null>(null);

const PAGE_SIZE = 10;

const fetchReviews = async (page: number): Promise<Review[]> => {
  const response = await fetch(
    `/api/reviews?page=${page}&pageSize=${PAGE_SIZE}`,
  );
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
  } = useQuery<Review[], Error>({
    queryKey: ['reviews'],
    queryFn: () => fetchReviews(1),
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
        ...old,
        { ...newReview, id: Date.now() },
      ]);

      queryClient.setQueryData(['reviews'], (old: Review[] = []) => [
        ...old,
        { ...newReview, id: Date.now() },
      ]);

      return { previousReviews };
    },

    onError: (_error, _newReview, context: any) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(['reviews'], context.previousReviews);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
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
      addReview: submitReview.mutate, // Expose as addReview
    }),
    [
      reviews,
      hasMoreReviews,
      isLoading,
      isError,
      isFetching,
      submitReview.mutate,
    ],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
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
