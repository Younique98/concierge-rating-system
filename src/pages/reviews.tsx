import StarRating from '@/components/StarRating';
import { useReviews } from '../../hooks/useReviews';
import toast from 'react-hot-toast';
import { useEffect, useRef, type RefObject } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      <Card className="md:mx-16 hidden md:inline-block lg:mx-28 sm:mx-36 shadow-md px-6 md:py-10 md:px-28 rounded-3xl leading-snug top-16 2xs:top-12 2xs:mb-0 sm:top-0 mb-16 text-center py-10">
        <CardHeader className=" flex justify-center items-center">
          <p className="mb-1">
            <Quotes />
          </p>
          <CardTitle className="text-3xl font-extrabold text-primary-600 md:text-5xl text-center">
            Ranked 5 out of 5 stars as the best award booking service
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className=" flex justify-center items-center">
          <p className="text-primary-500 font-semibold text-xs">FORBES</p>
        </CardFooter>
      </Card>

      <h2 className="text-xl font-bold mb-4" ref={reviewSectionRef}>
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
