import { useState } from 'react';

const Pagination = ({ itemsCount, pageSize, onPageChange }) => {
  const [activePage, setActivePage] = useState(1);
  const pageCount = Math.floor(itemsCount / pageSize);

  if (pageCount <= 1) {
    return null;
  }

  const pages = [...Array(pageCount + 1)].map((item, index) => index + 1);

  const handleClick = (page) => {
    setActivePage(page);
    onPageChange(page, activePage);
  };

  return (
    <div className="join">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          className={`join-item btn ${activePage === page ? 'btn-active' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
