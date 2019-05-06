import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {fetchData, updateItem, getItem } from '../../actions';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

import './page-item.css';

class PageItem extends Component{
  state = {
    id: '',
    title: '',
    price: '',
    loadedFromProps: false
  };

  componentDidMount() {
    this.props.onGetItem();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pageItem && !prevState.isLoadedFromProps) {
      this.setState((prevState, props) => {
        return {
          id: props.pageItem.id,
          title: props.pageItem.title,
          price: props.pageItem.price,
          isLoadedFromProps: true
        };
      });
    }
  }

  onSubmit = (event) => {
    const { onSubmit } = this.props;
    const { id, title, price } = this.state;

    event.preventDefault();

    onSubmit({ id, title, price });

    this.setState({
      isSubmited: true
    });

  };

  onTitleChange = (event) => {
    this.setState({title: event.target.value});
  };

  onPriceChange = (event) => {
    this.setState({price: event.target.value});
  };

  render() {
    const { pageItem } = this.props;

    if(!pageItem) return null;

    const { id, title, price, isSubmited } = this.state;

    if(isSubmited) {
      return (<Redirect to='/'/>);
    }

    return (
      <form className='pageItem'
            onSubmit={this.onSubmit}>

        <h1>#{ id || 'Новый тортик'}</h1>

        <div className='field'>
          <label className='field__label'>
            Название торта:
          </label>

          <input className='field__input'
                 type='text'
                 name='name'
                 value={title}
                 onChange={this.onTitleChange}/>
        </div>

        <div className='field'>
          <label className='field__label'>
            Цена:
          </label>

          <input className='field__input'
                 type='number'
                 name='price'
                 value={price}
                 onChange={this.onPriceChange}/>
        </div>

        <button className='button'
                type='submit'
                onSubmit={this.onSubmit} >
          Сохранить
        </button>
      </form>
    );
  }
}

class PageItemContainer extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  onSubmit = (pageItem) => {
    const { updateItem } = this.props;
    updateItem(pageItem);
  };

  onGetItem = () => {
    const itemId = parseInt(this.props.match.params.id);
    this.props.getItem(itemId);
  };

  render() {
    const { loading, error, pageItem } = this.props;

    if (loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorIndicator/>
    }

    return (<PageItem onGetItem={this.onGetItem}
                      onSubmit={this.onSubmit}
                      pageItem={pageItem} />);
  }
}

const mapStateToProps = ({ loading, error, pageItem }) => {
  return {
    loading,
    error,
    pageItem
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData(dispatch)),
    updateItem: (itemData) => dispatch(updateItem(dispatch, itemData)),
    getItem: (itemId) => dispatch(getItem(itemId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageItemContainer);
