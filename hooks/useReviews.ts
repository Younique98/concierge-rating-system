import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Review from '@/data/Review';
import { useError } from '@/context/ErrorContext';

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

export const useReviews = () => {
  const [page, setPage] = useState(1);
  const PAGE_NUMBER = page.toString();
  const queryClient = useQueryClient();
  const { setError } = useError();

  const {
    data: reviews = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<Review[], Error>({
    queryKey: ['reviews', page],
    queryFn: () => fetchReviews(page),
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
      await queryClient.cancelQueries({ queryKey: ['reviews', PAGE_NUMBER] });

      const previousReviews = queryClient.getQueryData<Review[]>([
        'reviews',
        page,
      ]);

      queryClient.setQueryData(
        ['reviews', PAGE_NUMBER],
        (old: Review[] = []) => [...old, { ...newReview, id: Date.now() }],
      );

      return { previousReviews };
    },

    onError: (_error, _newReview, context: any) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(['reviews', page], context.previousReviews);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', PAGE_NUMBER] });
    },
  });

  const hasMoreReviews = reviews.length === PAGE_SIZE;
  return {
    reviews,
    hasMoreReviews,
    isLoading,
    isError,
    page,
    setPage,
    refetch,
    isFetching,
    submitReview,
  };
};
