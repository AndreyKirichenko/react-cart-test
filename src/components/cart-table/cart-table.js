import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withDataService } from '../hoc'
import { fetchData } from '../../actions';

import './cart-table.css';
import CartTableItem from '../cart-table-item/cart-table-item';

const CartTable = (props) => {
  const { data } = props;
  
  const getRows = () => {
    return data.map((item) => {
      return (
        <CartTableItem key={item.id} item={item} />
      );
    });
  };

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
    this.props.fetchData();
  }

  render() {
    const { loading, error, data } = this.props;

    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorIndicator/>
    }

    return <CartTable data={data}/>;
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
    fetchData: fetchData(dispatch, dataService)
  }
};

export default compose(
  withDataService(),
  connect(mapStateToProps, mapDispatchToProps)
)(CartTableContainer);
