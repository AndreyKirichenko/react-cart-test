import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './page-cart.css';

import CartTable from '../cart-table';
import Paginator from '../paginator';
import CartTotal from '../cart-total';
import { fetchData, updateCartPageNum, removeItem } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const PageCart = (props) => {
  const { pageCart: {
      itemsOnPage,
      pageNum,
      pagesQuantity,
    },
    cartTotal,
    onRemoveItem
  } = props;

  return (
    <div className='pageCart'>
      <div className='pageCart__header'>
        <h1 className='pageCart__title'>Корзина</h1>
        <Link to='/item' className='button'>Добавить торт</Link>
      </div>
      <div className='pageCart__cartTable'>
        <CartTable itemsOnPage={itemsOnPage} onRemoveItem={onRemoveItem}/>
      </div>

      <div className='pageCart__total'>
        <CartTotal {...cartTotal} />
      </div>
      <Paginator pageNum={pageNum} pagesQuantity={pagesQuantity} />
    </div>
  );
};

class PageCartContainer extends Component {
  componentDidMount() {
    const page = parseInt(this.props.match.params.page || 1);

    this.props.fetchData().then(() => {
      this.props.updateCartPageNum(page);
    });
  }

  onRemoveItem = (itemId) => {
    this.props.removeItem(itemId);
  };

  render() {
    const { loading, error, pageCart, cartTotal } = this.props;


    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorIndicator/>
    }

    return (<PageCart pageCart={pageCart} cartTotal={cartTotal} onRemoveItem={this.onRemoveItem} />);
  }
}

const mapStateToProps = ({ loading, error, pageCart, cartTotal }) => {
  return {
    loading,
    error,
    pageCart,
    cartTotal
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData(dispatch)),
    updateCartPageNum: (pageNum) => dispatch(updateCartPageNum(dispatch, pageNum)),
    removeItem: (id) => dispatch(removeItem(dispatch, id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageCartContainer);
