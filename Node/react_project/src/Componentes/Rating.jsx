import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../Estilos/Rating.css"

const Rating = ({ initialRating = 0, maxRating = 5, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingChange(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              size={25}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;