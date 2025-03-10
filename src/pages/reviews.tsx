import StarRating from '@/components/StarRating';
import { useReviews } from '../../hooks/useReviews';
import toast from 'react-hot-toast';
import { useEffect, useRef, type RefObject } from 'react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Quotes } from '../../public/quote';
import { ReviewForm } from '@/components/ReviewForm';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import clsx from 'clsx';

const ReviewApp = () => {
  const {
    reviews,
    isError,
    page,
    setPage,
    hasMoreReviews,
    refetch,
    isFetching,
  } = useReviews();

  const onPageOne = page > 1; // TODO: (ET) handle this better
  const reviewSectionRef: RefObject<HTMLHeadingElement> = useRef(null);
  const reviewCommentSectionRef: RefObject<HTMLHeadingElement> = useRef(null);
  const lastReviewRef = useRef(null);

  const handleNextPage = () => {
    setPage(prev => prev + 1);

    setTimeout(() => {
      reviewSectionRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 100);
  };

  useEffect(() => {
    if (!hasMoreReviews) return;

    if (onPageOne && reviewSectionRef.current) {
      reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (isError) {
      toast.error('Failed to load reviews. Please try again later.');
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    if (lastReviewRef.current) observer.observe(lastReviewRef.current);
    return () => observer.disconnect();
  }, [hasMoreReviews, isError, onPageOne, setPage]);

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
      <div className="mb-36">
        <Card className="max-w-4xl mx-auto shadow-lg px-6 py-12 md:py-16 md:px-24 rounded-3xl leading-snug relative text-center animate-fadeIn">
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
                <p className="italic text-gray-400 text-sm">
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
        {onPageOne && (
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-8 py-3 border rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:bg-primary-700 transition-all"
          >
            Previous
          </button>
        )}
        {hasMoreReviews && (
          <button
            onClick={e => {
              e.preventDefault();
              handleNextPage();
            }}
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

ReviewApp.displayName = 'ReviewApp';
export default ReviewApp;
