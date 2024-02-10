import React from 'react';

const Pagination = ({ current, onChange, total }) => {
  const handlePrevClick = () => {
    if (current > 1) {
      onChange(current - 1);
    }
  };

  const handleNextClick = () => {
    if (current < total) {
      onChange(current + 1);
    }
  };

  return (
    <div data-testid="page-container">
      <button
        data-testid="prev-page"
        onClick={handlePrevClick}
        disabled={current === 1} // Disable prev button if on first page
      >
        Prev
      </button>
      <button data-testid="current-page">{current}</button>
      <button
        data-testid="next-page"
        onClick={handleNextClick}
        disabled={current === total} // Disable next button if on last page
      >
        Next
      </button>
      <div>
        Total Pages: <b data-testid="total-pages">{total}</b>
      </div>
    </div>
  );
};

export default Pagination;
