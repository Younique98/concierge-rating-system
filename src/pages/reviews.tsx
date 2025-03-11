import StarRating from '@/components/StarRating';
import { useReviews } from '@/context/ReviewContext';
import toast from 'react-hot-toast';
import { useEffect, useRef, type RefObject } from 'react';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Quotes } from '../../public/quote';
import { ReviewForm } from '@/components/ReviewForm';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import Reviews from '@/components/Reviews';

const CustomerReviews = () => {
  const { isError, hasMoreReviews, isFetching } = useReviews();

  const reviewSectionRef: RefObject<HTMLHeadingElement> = useRef(null);
  const lastReviewRef = useRef(null);

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
      {/* // TODO: (ET) move card out */}
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
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-wide">
              FORBES
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Review Submission Form */}
      <Reviews />
    </div>
  );
};

CustomerReviews.displayName = 'CustomerReviews';
export default CustomerReviews;
