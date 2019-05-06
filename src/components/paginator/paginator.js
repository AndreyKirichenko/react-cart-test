import React from 'react';
import { Link } from 'react-router-dom';

import './paginator.css';

const Paginator = (props) => {
  const { pageNum, pagesQuantity } = props;

  const getItem = (i) => {
    return (
      <li className='paginator__item' key={i}>
        <Link to={`/cart/${i}`} className='paginator__link'>
          {i}
        </Link>
      </li>
    );
  };

  const pages = [];

  for(let i = 1; i <= pagesQuantity; i++) {
    pages.push(getItem(i));
  }

  return (
    <ul className='paginator'>
      {pages}
    </ul>
  );
};

export default Paginator;
