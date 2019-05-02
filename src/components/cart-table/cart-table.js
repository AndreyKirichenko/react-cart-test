import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import { withDataService } from '../hoc'
import { fetchData } from '../../actions';

import './cart-table.css';

const CartTable = () => {
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
        <tr className='cartTable__row'>
          <td className='cartTable__cell'>
            1
          </td>

          <td className='cartTable__cell'>
            500р
          </td>

          <td className='cartTable__cell'>
            Торт 1
          </td>

          <td className='cartTable__cell'>
            изменить
          </td>

          <td className='cartTable__cell'>
            удалить
          </td>
        </tr>
      </tbody>
    </table>
  );
};

class CartTableContainer extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { loading, error } = this.props;

    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorIndicator/>
    }

    return <CartTable/>;
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
