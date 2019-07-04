import React from 'react';
import { connect } from 'react-redux';
import BaseFilters from './BaseFilters';
import SearchBar from './SearchBar';
import PriceSlider from './PriceSlider';

export class Header extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <header className="header">
                <div className="header-container">
                    <div className="logo-container">
                        <span className='logo'>coveo</span>
                    </div>
                    <div className="header__content">
                        <BaseFilters />
                        <PriceSlider />
                        <SearchBar />
                    </div>
                </div>
            </header>
        );
    }
}

export default connect()(Header);