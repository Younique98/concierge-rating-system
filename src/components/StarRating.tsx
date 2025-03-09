import { useState } from 'react';
import Star from '@/components/Star';

interface StarRatingProps {
  rating: number;
  onRatingSelect?: (rating: number) => void;
  allowUserInput?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  allowUserInput = false,
  onRatingChange,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(rating);

  const handleRatingChange = (starId: number) => {
    if (!allowUserInput) return;
    setSelectedRating(starId);
    if (onRatingChange) {
      onRatingChange(starId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, starId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleRatingChange(starId);
    }
    if (event.key === 'ArrowRight' && starId < 5) {
      handleRatingChange(starId + 1);
    }
    if (event.key === 'ArrowLeft' && starId > 1) {
      handleRatingChange(starId - 1);
    }
  };
  return (
    <section className="flex items-center" aria-labelledby="rating-label">
      <h2 id="rating-label" className="sr-only">
        {allowUserInput ? 'Select a star rating' : 'User rating'}
      </h2>
      <div role="radiogroup" aria-labelledby="rating-label">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            starId={index}
            marked={index <= selectedRating}
            {...(allowUserInput && {
              onClick: () => handleRatingChange(index),
              onKeyDown: event => handleKeyDown(event, index),
            })}
          />
        ))}
      </div>
      {allowUserInput && (
        <input
          type="submit"
          className="mt-10 h-10 px-6 font-semibold rounded-md bg-black text-white"
          value="Submit review"
          disabled={selectedRating === 0}
        />
      )}
    </section>
  );
};

StarRating.displayName = 'StarRating';
export default StarRating;
