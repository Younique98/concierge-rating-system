import StarRating from '@/components/StarRating';
import { useReviews } from '../../hooks/useReviews';
import { SkeletonLoader } from './SkeletonLoader';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const ReviewApp = () => {
  const { reviews, isLoading, isError, page, setPage, hasMoreReviews } =
    useReviews();
  const onPageOne = page > 1; // TODO: (ET) handle this better

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load reviews. Please try again later.');
    }
  }, [isError]);
  // TODO: (ET) Smoothen out the transition when user clicks next
  if (isLoading) {
    return (
      <div className="p-4">
        <SkeletonLoader />
        <SkeletonLoader />
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-bold mb-4">User Reviews</h2>
      {reviews.length > 0 ? (
        <ul className="space-y-4">
          {reviews.map(review => (
            <li
              key={review.id}
              className="border p-3 rounded shadow w-full min-w-[300px] md:w-[500px] flex flex-col"
            >
              <p className="font-semibold">{review.author}</p>
              <StarRating rating={review.rating} />
              {review.review ? (
                <p className="text-gray-700 break-words">{review.review}</p>
              ) : (
                <p className="italic text-gray-500">No written review</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-gray-500">No reviews available.</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        {onPageOne && (
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
        )}
        {hasMoreReviews && (
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="px-4 py-2 border rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
