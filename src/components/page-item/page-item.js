import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchData, updateItem, getItem } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './page-item.css';

class PageItem extends Component{
  componentDidMount() {
    this.props.onGetItem();
  }

  render() {
    return (
      <div className='pageItem'>
        <form >
          <div className='field'>
            <label className='field__label'>
              Название торта:
            </label>

            <input className='field__input' type='text' name='name' />
          </div>

          <div className='field'>
            <label className='field__label'>
              Цена:
            </label>

            <input className='field__input' type='number' name='name' />
          </div>
          <button  className='button' type='submit' >Сохранить</button>
        </form>
      </div>
    );
  }
}

class PageItemContainer extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  onSubmit = (event) => {
    const { updateItem } = this.props;
    console.log(event);
    event.preventDefault();
  };

  onGetItem = () => {
    const itemId = parseInt(this.props.match.params.id);
    this.props.getItem(itemId);
  };

  render() {
    const { loading, error, currentItem } = this.props;

    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorIndicator/>
    }

    return (<PageItem onGetItem={this.onGetItem} onSubmit={this.onSubmit} currentItem={currentItem} />);
  }
}

const mapStateToProps = ({ loading, error, currentItem }) => {
  return {
    loading,
    error,
    currentItem
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData(dispatch)),
    updateItem: (itemData) => dispatch(updateItem(itemData)),
    getItem: (itemId) => dispatch(getItem(itemId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageItemContainer);
