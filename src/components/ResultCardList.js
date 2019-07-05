import React from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard';
 
export const ResultCardList = (props) => {
    return (
        <div className='card-container'>
            {
                props.results.map(result => {
                    return (
                        <ResultCard key={result.uniqueId} result={result}/>
                    )
                })
            }
        </div>
    );
}

const mapStateToProps = (state) => (
    {
        results: state.content.results
    }
);

export default connect(mapStateToProps)(ResultCardList);