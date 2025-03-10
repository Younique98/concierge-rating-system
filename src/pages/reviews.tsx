import StarRating from '@/components/StarRating';
import { useReviews } from '../../hooks/useReviews';
import toast from 'react-hot-toast';
import { useEffect, useRef, type RefObject } from 'react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Quotes } from '../../public/quote';
import { ReviewForm } from '@/components/ReviewForm';
import { SkeletonLoader } from '@/components/SkeletonLoader';

const ReviewApp = () => {
  const {
    reviews,
    isLoading,
    isError,
    page,
    setPage,
    hasMoreReviews,
    refetch,
  } = useReviews();
  const onPageOne = page > 1; // TODO: (ET) handle this better
  const reviewSectionRef: RefObject<HTMLHeadingElement> = useRef(null);

  useEffect(() => {
    if (onPageOne && reviewSectionRef.current) {
      reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (isError) {
      toast.error('Failed to load reviews. Please try again later.');
    }
  }, [isError, onPageOne]);
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
      <div className="mb-36">
        <Card className="max-w-4xl mx-auto shadow-md px-6 py-10 md:py-14 md:px-24 rounded-3xl leading-snug relative top-16 md:top-12 sm:top-0 text-center">
          <CardHeader className="flex flex-col justify-center items-center space-y-3">
            {/* Quote Icon */}
            <div className="mb-1">
              <Quotes />
            </div>
            {/* Headline */}
            <CardTitle className="text-2xl font-extrabold text-primary-600 md:text-4xl lg:text-5xl text-center leading-tight">
              Ranked 5 out of 5 stars as the best award booking service
            </CardTitle>
          </CardHeader>
          {/* Footer for Credit */}
          <CardFooter className="flex justify-center items-center">
            <p className="text-primary-500 font-semibold text-sm uppercase tracking-wide">
              FORBES
            </p>
          </CardFooter>
        </Card>
      </div>

      <h2
        className="text-4xl text-center font-sans font-bold mb-10"
        ref={reviewSectionRef}
      >
        User Reviews
      </h2>
      {/* Review Submission Form */}
      <ReviewForm onReviewSubmitted={refetch} />

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <ul className="space-y-4 flex items-center justify-center flex-wrap">
          {reviews.map(review => (
            <li
              key={review.id}
              className="border p-5 bg-white rounded-lg shadow-md w-full max-w-3xl mx-auto min-w-[300px] flex flex-col"
            >
              <p className="font-semibold text-lg">{review.author}</p>
              <StarRating rating={review.rating} />
              {review.review ? (
                <p className="text-gray-700 text-sm leading-relaxed break-words">
                  {review.review}
                </p>
              ) : (
                <p className="italic text-gray-400 text-sm">
                  No written review
                </p>
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
            onClick={e => {
              e.preventDefault();
              setPage(prev => prev + 1);
            }}
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
