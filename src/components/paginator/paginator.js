import React from 'react';

import './paginator.css';

const Paginator = () => {
  return (
    <ul className='paginator'>
      <li className='paginator__item'>
        <a href='#' className='paginator__link'>
          1
        </a>
      </li>

      <li className='paginator__item'>
        <a href='#' className='paginator__link'>
          2
        </a>
      </li>

      <li className='paginator__item'>
        <a href='#' className='paginator__link'>
          3
        </a>
      </li>

      <li className='paginator__item'>
        <a href='#' className='paginator__link'>
          20
        </a>
      </li>
    </ul>
  );
};

export default Paginator;
