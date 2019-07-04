import React from 'react';
import { connect } from 'react-redux';
import { startSearchByText } from '../actions/filters';
 
class SearchBar extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    };

    handleInputChange = (e) => {
        e.preventDefault();
        const val = e.target.value;
        this.setState({
            searchValue: val
        });
    };

    submitSearch = (e) => {
        e.preventDefault();
        this.props.startSearchByText(this.state.searchValue);
    };

    render () {
        return (
            <form onSubmit={this.submitSearch} className='search-bar__form header__el'>
                <div className='search__group-input'>
                    <input 
                        className='search-bar__input'
                        type='text' 
                        value={this.state.searchValue} 
                        onChange={this.handleInputChange} 
                        placeholder='What’s your poison?'
                    />
                    <button type='submit' className='search-bar__btn'>
                        <i className="ionicons ion-search"></i>
                    </button>
                </div>
            </form>
        )
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        startSearchByText: (seatchText) => dispatch(startSearchByText(seatchText))
    }
}
 
export default connect(undefined, mapDispatchToProps)(SearchBar);