import React from 'react';
import { connect } from 'react-redux';
import { startUpdatePageNum } from '../actions/filters';
 
export const Pagination = (props) => {

    // Set all pagination variables 
    const numberOfPages = Math.ceil(props.totalResults / props.numberOfResults);
    const currentPage = Math.ceil(props.firstResult / props.numberOfResults) + 1;
    const limitPages = numberOfPages < 5 ? numberOfPages : 5;
    
    const setPages = () => {
        let startingPage;
        
        if(currentPage < 4 || numberOfPages < 5) {
            startingPage = 1
        } else if(currentPage >= numberOfPages - 2) {
            startingPage = (currentPage - 4) + (numberOfPages - currentPage)
        } else  {
            // Start with offset if current page is at 4 or higher
            startingPage = currentPage - 2
        }

        let temp = [];
        for(let i = startingPage; i < startingPage + limitPages; i++) {
            temp.push(i);
        }

        return temp;
    }

    const handlePageNumber = (e) => {
        const dataTarget = e.target.dataset.target;
        const calcNextResult = (dataTarget - 1) * props.numberOfResults;
        // Since API doesn't return a number higher than 1000, we go back to 1
        const nextFirstResult = calcNextResult >= 1000 ? 0 : calcNextResult;
        props.startUpdatePageNum(nextFirstResult);
    }
    
    // Button component for all pagination buttons
    const PaginationButton = ({pageNum, displayVal = pageNum, className, onMouseDown}) => {
        return (
            <button
                className={`pagination__btn ${className} ${pageNum === currentPage ? 'active-page' : ''}`}
                onMouseDown={onMouseDown}  
                data-target={pageNum}
            >
                {displayVal}
            </button>
        )
    }

    // Populate array with page numbers
    let pages = setPages();

    return (
        <div className='pagination'>
            {
                currentPage > 1 &&
                <PaginationButton onMouseDown={handlePageNumber} pageNum={currentPage - 1} displayVal={'Prev'} className={'next-prev-btn prev-btn'}/>
            }
            {
                (currentPage > 4) &&
                <PaginationButton onMouseDown={handlePageNumber} pageNum={1} displayVal={'1...'} className={'next-prev-btn pagination-1'}/>
            }
            {
                numberOfPages > 1 &&
                pages.map(page => {
                  return <PaginationButton onMouseDown={handlePageNumber} key={page} pageNum={page} className={`page-btn pagination-${page}`}/>
                })
            }
            {
                currentPage < numberOfPages &&
                <PaginationButton onMouseDown={handlePageNumber} pageNum={currentPage + 1} displayVal={'Next'} className={'next-prev-btn next-btn'}/>
            }
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

const mapDispatchToProps = (dispatch) => (
    {
        startUpdatePageNum: (firstResult) => dispatch(startUpdatePageNum(firstResult))
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);