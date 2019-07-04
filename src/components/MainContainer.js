import React from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard';
import Pagination from './Pagination';
 
const MainContainer = (props) => {

    const showingResults = `Showing results ${props.firstResult} - ${props.firstResult + props.numberOfResults}`;

    return (
        <div className='main-container'>
            <div className='results-info'>
                <div>Total number of results <strong>{props.totalResults}</strong></div>
                <div>{showingResults}</div>
                <Pagination />
            </div>
            <div className='card-container'>
                {
                    props.results.map(result => {
                        return (
                            <ResultCard key={result.uniqueId} result={result}/>
                        )
                    })
                }
            </div>
            <Pagination />
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        totalResults: state.content.resultsCount,
        numberOfResults: state.filters.numberOfResults,
        firstResult: state.filters.firstResult,
        results: state.content.results,
    }
);

export default connect(mapStateToProps)(MainContainer);