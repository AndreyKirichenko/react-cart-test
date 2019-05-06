import React from 'react';
import { Link } from 'react-router-dom';

import './paginator.css';

const RADIUS = 4;

const Paginator = (props) => {
  const { pageNum, pagesQuantity } = props;

  const getItem = (i) => {
    let classNames = 'paginator__link';

    if(i === pageNum) {
      classNames += ' paginator__link--active';
    }

    return (
      <li className='paginator__item' key={i}>
        <Link to={`/cart/${i}`} className={classNames}>
          {i}
        </Link>
      </li>
    );
  };

  const getDotts = (i) => {
    return (
      <li className='paginator__item paginator__item--dotts' key={i}>
        ...
      </li>
    );
  };

  let from = pageNum - RADIUS;
  if (from < 1) from = 1;

  let to = pageNum + RADIUS;
  if (to > pagesQuantity) to = pagesQuantity;

  const pages = [];

  if(from > 1) {
    pages.push(getItem(1));
  }

  if(from > 2) {
    pages.push(getDotts(2));
  }

  for(let i = from; i <= to; i++) {
    pages.push(getItem(i));
  }

  if(to < pagesQuantity - 1) {
    pages.push(getDotts(pagesQuantity - 1));
  }

  if(to < pagesQuantity) {
    pages.push(getItem(pagesQuantity));
  }

  return (
    <ul className='paginator'>
      {pages}
    </ul>
  );
};

export default Paginator;
