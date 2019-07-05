import React from 'react';
import { connect } from 'react-redux';
import ResultCardList from './ResultCardList';
import Pagination from './Pagination';
import FilterControlUI from './FilterControlUI';

const MainContainer = (props) => {

    const showingResults = `Showing results ${props.firstResult} - ${props.firstResult + props.numberOfResults}`;

    return (
        <div className='main-container'>
            <div className='filterUI-resInfo'>
                <FilterControlUI />
                <div className='results-info'>
                    <div>Total number of results <strong>{props.totalResults}</strong></div>
                    <div>{showingResults}</div>
                    <Pagination />
                </div>
            </div>
            

            
            <ResultCardList />
            <Pagination />
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        totalResults: state.content.resultsCount,
        numberOfResults: state.filters.numberOfResults,
        firstResult: state.filters.firstResult
    }
);

export default connect(mapStateToProps)(MainContainer);