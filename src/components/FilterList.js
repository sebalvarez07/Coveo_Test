import React from 'react';
import { connect } from 'react-redux';
import FilterItem from './FilterItem';

class FilterList extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            this.props.filters.map(filter => {
                return (
                    <FilterItem key={`${filter.field}`} filterName={filter.field} filter={filter.values}/>
                )
            })
        )
    }
 }

 const mapStateToProps = (state) => (
    {
        filters: state.content.groupBy
    }
);

 export default connect(mapStateToProps)(FilterList);