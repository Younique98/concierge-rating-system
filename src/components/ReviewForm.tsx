import toast from 'react-hot-toast';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import Star from './Star';
import { Button } from './Button';

type TReviewFormData = {
  author: string;
  rating: number;
  review?: string;
};
export const ReviewForm = ({
  onReviewSubmitted,
}: {
  onReviewSubmitted: () => void;
}) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TReviewFormData>();
  const rating = watch('rating', 0);
  const allowUserInput = true; //TODO: (ET) replace with an auth check

  const onSubmit = async (data: TReviewFormData) => {
    try {
      // TODO: (ET) move out and make a hook to do this called getReviews
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit review.');
      }
      if (response.ok) reset();
      toast.success('Review submitted successfully!');
      onReviewSubmitted();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit review.';
      toast.error(errorMessage);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, starId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setValue('rating', starId);
    }
    if (event.key === 'ArrowRight' && starId < 5) {
      setValue('rating', starId + 1);
    }
    if (event.key === 'ArrowLeft' && starId > 1) {
      setValue('rating', starId - 1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border rounded shadow mb-8 md:w-3/4 mx-auto"
    >
      <h2 className="text-lg font-semibold mb-2">Leave a Review</h2>

      {/* Author Name */}
      <label className="block mb-2" htmlFor="author">
        <span className="text-sm font-medium">Your Name</span>{' '}
      </label>
      <input
        id="author"
        aria-labelledby="author"
        type="text"
        {...register('author', { required: 'Name is required.' })}
        placeholder="Your name"
        className="border rounded border-gray-300 px-4 py-2 focus:ring-primary-500 focus:border-primary-500 w-full"
      />
      {errors.author && (
        <p className="text-red-500 text-sm">{errors.author.message}</p>
      )}

      {/* Star Rating */}
      <div className="flex flex-col">
        {/* Hidden input for accessibility */}
        <label htmlFor="rating" className="block text-sm font-medium">
          Rating
        </label>

        {/* Visually Hidden Input for Screen Readers */}
        <input
          type="number"
          id="rating"
          name="rating"
          value={rating}
          onChange={e => setValue('rating', Number(e.target.value))}
          className="sr-only" // Hide visually but keep for accessibility
          required
        />

        {/* Star Buttons as a Radio Group */}
        <div
          role="radiogroup"
          aria-labelledby="rating-label"
          className="flex space-x-2"
        >
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              role="radio"
              aria-checked={rating === index + 1}
              aria-label={`${index + 1} star${index !== 0 ? 's' : ''}`}
              onClick={() => setValue('rating', index + 1)}
              className={clsx(
                'w-8 h-8 flex items-center justify-center rounded-full ',
                rating > index ? 'text-yellow-500' : 'text-gray-400',
              )}
            >
              <Star
                starId={index}
                marked={index < rating}
                {...(allowUserInput && {
                  onKeyDown: event => handleKeyDown(event, index),
                })}
              />
            </button>
          ))}
        </div>

        {/* Error Message */}
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>

      {/* Review Text */}
      <label>
        <span>Your Review (Optional)</span>
        <textarea
          placeholder="Write your review..."
          {...register('review')}
          className="border rounded-md px-4 py-2 h-24  border-gray-300 focus:ring-primary-500 focus:border-primary-500 w-full"
        />
      </label>
      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !rating}
        className="w-full bg-primary-600 border text-white font-semibold py-3 p-2 rounded-md transition-all hover:bg-primary-700 mt-3 disabled:opacity-100"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};
