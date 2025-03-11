import StarRating from '@/components/StarRating';
import { useReviews } from '@/context/ReviewContext';
import { SkeletonLoader } from './SkeletonLoader';
import toast from 'react-hot-toast';
import { RefObject, useEffect, useRef } from 'react';
import { ReviewForm } from './ReviewForm';
import clsx from 'clsx';

const Reviews = () => {
  const {
    reviews,
    isError,
    hasMoreReviews,
    isFetching,
    isLoading,
    prevPage,
    nextPage,
    page,
  } = useReviews();
  const reviewSectionRef: RefObject<HTMLHeadingElement> = useRef(null);
  const reviewCommentSectionRef: RefObject<HTMLHeadingElement> = useRef(null);
  const lastReviewRef = useRef(null);
  const onFirstPage = page !== 1;

  const handleNextPage = () => {
    setTimeout(() => {
      reviewSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  };

  useEffect(() => {
    if (!hasMoreReviews) return;

    if (isError) {
      toast.error('Failed to load reviews. Please try again later.');
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        handleNextPage();
      }
    });

    if (lastReviewRef.current) observer.observe(lastReviewRef.current);
    return () => observer.disconnect();
  }, [hasMoreReviews, isError]);

  // TODO: (ET) Smoothen out the transition when user clicks next
  if (isFetching) {
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
      <h1
        className="text-4xl text-center font-sans font-bold mb-10"
        ref={reviewSectionRef}
      >
        User Reviews
      </h1>
      {/* Review Submission Form */}
      <ReviewForm />

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <ul
          className="space-y-4 flex flex-col items-center justify-center min-h-[300px]"
          aria-live="polite"
        >
          {reviews.map(review => (
            <li
              key={review.id}
              className="border p-5 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto min-w-[300px] flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg"
            >
              <p
                ref={reviewCommentSectionRef}
                className="font-semibold text-lg"
              >
                {review.author}
              </p>
              <StarRating
                rating={review.rating}
                aria-label={`Rating: ${review.rating} stars`}
              />
              {review.review ? (
                <p className="text-gray-700 text-sm leading-relaxed break-words">
                  {review.review}
                </p>
              ) : (
                <p className="italic text-gray-500 text-sm">
                  No written review
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="italic text-gray-500 text-center0">
          No reviews available.
        </p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        {onFirstPage && (
          <button
            className="px-8 py-3 border rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:bg-primary-700 transition-all"
            type="button"
            aria-label={`Go to previous page, page ${page - 1}`}
            aria-disabled={page === 1 || isLoading}
            tabIndex={page === 1 || isLoading ? -1 : 0}
            onClick={prevPage}
          >
            Previous
          </button>
        )}
        {hasMoreReviews && (
          <button
            onClick={nextPage}
            type="button"
            aria-label={`Go to next page, page ${page + 1}`}
            aria-disabled={!hasMoreReviews || isLoading}
            tabIndex={!hasMoreReviews || isLoading ? -1 : 0}
            className="px-8 py-3 border rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:bg-primary-700 transition-all"
          >
            Next
          </button>
        )}

        <button
          className={clsx(
            'px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform',
          )}
          onClick={() =>
            reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Leave a Review
        </button>
      </div>
    </div>
  );
};

Reviews.displayName = 'Reviews';
export default Reviews;
