import React from 'react';

interface StarProps {
  starId: number;
  marked: boolean;
  onClick?: (starId: number) => void;
  onKeyDown?: (event: React.KeyboardEvent, starId: number) => void;
  allowUserInput?: boolean;
}

const Star: React.FC<StarProps> = ({
  starId,
  marked,
  onClick,
  onKeyDown,
  allowUserInput,
}) => {
  console.log('starId', starId);
  console.log('marked', marked);
  console.log('onClick', onClick);
  console.log('onKeyDown', onKeyDown);
  console.log('allowUserInput', allowUserInput);
  return (
    <span
      data-star-id={starId}
      className="text-3xl cursor-pointer"
      role="radio"
      aria-checked={marked}
      tabIndex={allowUserInput ? 0 : -1} // Only allow tabbing if user input is enabled
      {...(allowUserInput && {
        onClick: () => onClick?.(starId),
        onKeyDown: event => onKeyDown?.(event, starId),
      })}
    >
      {marked ? '★' : '☆'}
    </span>
  );
};

Star.displayName = 'Star';
export default Star;
