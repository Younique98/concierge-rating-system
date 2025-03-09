import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Review from '@/data/Review';

const PAGE_SIZE = 5;

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
  const PAGE_SIZE = 5;

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['reviews', page],
    queryFn: () => fetchReviews(page),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry twice on failure
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
  };
};
