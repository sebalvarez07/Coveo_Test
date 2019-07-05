import React from 'react';
import { connect } from 'react-redux';
import FilterItem from './FilterItem';
 
export class FilterList extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                {
                    this.props.filters.map(filter => {
                        return (
                            <FilterItem key={`${filter.field}`} filterName={filter.field} filter={filter.values}/>
                        )
                    })
                }
            </div>
        )
    }
 }

 const mapStateToProps = (state) => (
    {
        filters: state.content.groupBy
    }
);

 export default connect(mapStateToProps)(FilterList);