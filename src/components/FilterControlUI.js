import React from 'react';
import { connect } from 'react-redux';
import { groupMap } from '../fixtures/helpers';
import { startRemoveFilterValue } from '../actions/filters';

export const FilterControlUI = (props) => {

    const handleValueRemoval = (e) => {
        const btn = e.target.closest('.filter-control__btn');
        const group = btn.dataset.group;
        const val = btn.dataset.value;
        props.startRemoveFilterValue(group, val);
    } 

    return (
        <div className='filter-controlUI'>
            <h4 className='current-viewing'>
                Currently Viewing: {props.baseFilter.join(' & ')}
            </h4>
            {
                Object.keys(props.filtersActive).map(category => {
                    if(props.filtersActive[`${category}`].values.length > 0) {
                        return (
                            <div className='filter-control__container' key={category}>
                                <span className='filter-control__cat'>{groupMap.get(category)}: </span>
                                {
                                    props.filtersActive[category].values.map(activeFilterVal => {
                                        return <button 
                                                    data-group={category}
                                                    data-value={activeFilterVal}
                                                    className='filter-control__btn'
                                                    onMouseDown={handleValueRemoval}
                                                    key={activeFilterVal}>
                                                        {activeFilterVal}
                                                        <i className="ionicons ion-close"></i>
                                                </button>
                                    })
                                }
                            </div>
                        )    
                    }
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        filtersActive: state.filters.categories,
        baseFilter: state.filters.baseFilter
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        startRemoveFilterValue: (group, value) => dispatch(startRemoveFilterValue(group, value)),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(FilterControlUI);