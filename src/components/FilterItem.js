import React from 'react';
import { connect } from 'react-redux';
import { startUpdateCategory, startUpdateCategoryLimit } from'../actions/filters';
import { groupMap } from '../fixtures/helpers';

const defaultLimit = 5;

class FilterItem extends React.Component {

    constructor(props) {
        super(props);
        this.checkBoxes = [];
        this.checkedItems = new Set();
        this.state = {
            valueLimit: defaultLimit
        }
    }

    componentWillMount () {
        this.checkBoxes = this.props.filter.map(option => option.value);
    }

    componentWillUpdate (nextProps) {

        this.checkedItems = new Set([...this.props.checkedFilters]);

        if(nextProps.baseFilter !== this.props.baseFilter) {
            // TODO.. on baseFilter change, remove wine || beer filters           
        }
        
        // Ensure to keep check boxes on view
        this.checkBoxes = [...this.checkedItems];
    
        // Keep old checked boxes, and add new boxes
        nextProps.filter.forEach(option => {
            if(!this.checkedItems.has(option.value)){
                this.checkBoxes.push(option.value)
            }
        });     
    }

    handleChange = (e) => {
        const item = e.target.name;
        const isChecked = e.target.checked;
            
        if(isChecked) {
            this.checkedItems.add(item)
        } else {
            if(this.checkedItems.has(item)) {
                this.checkedItems.delete(item);
            }
        }

        const checkedItemsArr = Array.from(this.checkedItems);

        this.props.startUpdateCategory(this.props.filterName, checkedItemsArr);
    }

    dispatchMoreValues = () => {
        if(this.state.valueLimit <= this.props.filter.length) {
            return;
        } else {
            this.props.startUpdateCategoryLimit(this.props.filterName, this.state.valueLimit);
        }
    }

    handleValueLimit = (e) => {
        e.preventDefault();
        
        if(e.target.name === 'more'){
            this.setState(prevState => {
                return {
                    valueLimit: prevState.valueLimit + 5
                }
            }, this.dispatchMoreValues)
        }

        else if(e.target.name === 'less'){
            const resetLimit = this.checkedItems.size > defaultLimit ? this.checkedItems.size : defaultLimit;
            this.setState({ valueLimit: resetLimit});
        }
    }

    handleClearAll = () => {
        this.props.startUpdateCategory(this.props.filterName, []);
    }

    setLimit = () => {
        
        return this.checkedItems.size > this.state.valueLimit ? this.checkedItems.size : this.state.valueLimit;
    }

    renderCheckBox = (checkName) => {        
        return (
            <label className='check__container' key={`${checkName}`}>
                {`${checkName}`}
                <input 
                    className='custom__checkbox'
                    style={{ display: 'block' }} 
                    type='checkbox' 
                    name={`${checkName}`} 
                    checked={this.checkedItems.has(checkName)}
                    onChange={this.handleChange} 
                />
                <span className='checkmark'>
                    <i className="ionicons ion-checkmark"></i>
                </span>
            </label>
        )
    }
    
    render (){
        const limit = this.setLimit();
        return (
            <div className='sidebar__group'>
                <div className='group__header'>
                    <h3 className='group__tl'>{groupMap.get(this.props.filterName)}</h3>
                    <span className='clear-btn' onMouseDown={this.handleClearAll}>Clear All</span>
                </div>
                
                {
                    this.checkBoxes.reduce((acc, checkName, index) => {
                        if(limit > index) {
                            acc.push(this.renderCheckBox(checkName))
                        }
                        return acc;
                    }, [])
                }
                
                <div className='more_less__group'>
                    { this.state.valueLimit <= this.props.filter.length && 
                        <React.Fragment>
                            <button 
                                className='more_less__btn'
                                name={'more'}
                                onMouseDown={this.handleValueLimit}
                                >
                                Show More
                            </button>
                            <span> | </span>
                        </React.Fragment>
                    }
                    { this.props.filter.length >= defaultLimit && 
                        <button 
                            className='more_less__btn'
                            name={'less'}
                            onMouseDown={this.handleValueLimit}
                            >
                            Show Less
                        </button>
                    }
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startUpdateCategory: (group, update) => dispatch(startUpdateCategory(group, update)),
        startUpdateCategoryLimit: (group, valueLimit) => dispatch(startUpdateCategoryLimit(group, valueLimit))
    }
}

const mapStateToProps = (state, props) => {
    return  {
        baseFilter: state.filters.baseFilter,
        checkedFilters: state.filters.categories[`${props.filterName}`]['values']
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterItem);