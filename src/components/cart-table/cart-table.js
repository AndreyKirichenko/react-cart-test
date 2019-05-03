import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withDataService } from '../hoc'
import { fetchData, removeItem } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import CartTableItem from '../cart-table-item/cart-table-item';

import './cart-table.css';

const CartTable = (props) => {
  const { data, removeItem } = props;
  
  const getRows = () => {
    return data.map((item) => {
      return (
        <CartTableItem removeItem={removeItem} key={item.id} item={item} />
      );
    });
  };

  if(!data.length) return <span>Корзина пуста</span>;

  return (
    <table className='cartTable'>
      <thead>
        <tr className='cartTable__row'>
          <th className='cartTable__cell'>
            Id
          </th>

          <th className='cartTable__cell'>
            Цена
          </th>

          <th className='cartTable__cell'>
            Название
          </th>

          <th className='cartTable__cell'
              rowSpan='2'>
            Опции
          </th>
        </tr>
      </thead>

      <tbody>
        {getRows()}
      </tbody>
    </table>
  );
};

class CartTableContainer extends Component {
  componentDidMount() {
    console.log('CartTableContainer');
    // this.props.fetchData();
  }

  render() {
    const { loading, error, data, removeItem } = this.props;

    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorIndicator/>
    }

    return <CartTable removeItem={removeItem} data={data}/>;
  }
}

const mapStateToProps = ({ data, loading, error }) => {
  return {
    data,
    loading,
    error
  }
};

const mapDispatchToProps = (dispatch, { dataService }) => {
  return {
    fetchData: () => dispatch(fetchData(dispatch, dataService)),
    removeItem: (id) => dispatch(removeItem(id))
  }
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CartTableContainer);
