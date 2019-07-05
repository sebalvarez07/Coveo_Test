import React from 'react';
import { connect } from 'react-redux';
import { startUpdateCategory } from '../actions/filters';
import SliderComponent from './Slider';

const defaultValues = [0, 300];

export class PriceSlider extends React.Component {

    constructor(props) {
      super(props);
    }

    state = {
      domain: [0, 300],
      values: defaultValues.slice(),
      update: defaultValues.slice()
    }

    componentWillUpdate(nextProps, nextState) {
      if(nextProps.priceFilterVal !== this.props.priceFilterVal && nextProps.priceFilterVal.length === 0) {
          this.setState({
            values: defaultValues
          })           
      }
    }

    onUpdate = update => {
      this.setState({ update })
    }
  
    onChange = values => {
      this.setState({ values })
      const valOne = values[0] < values[1] ? values[0] : values[1];
      const valTwo = values[0] < values[1] ? values[1] : values[0];
  
      if(!(valOne === 0 && valTwo === 300)) {
        this.props.startUpdateCategory('tpprixnum', [`${valOne}..${valTwo}`]); 
      } else {
        this.props.startUpdateCategory('tpprixnum', []);
      }
    }

    render() {
        return (
            <div className='price-slider header__el'>
                <span className='price-slider__tl'>
                    Price Range
                </span>
                <SliderComponent 
                    domain={this.state.domain}
                    values={this.state.values}
                    update={this.state.update}
                    onChange={this.onChange}
                    onUpdate={this.onUpdate}
                />
                <span className='price-slider__current-range'>
                    {`${this.state.values[0]} $ - ${this.state.values[1]} $`}
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    baseFilter: state.filters.baseFilter,
    priceFilterVal: state.filters.categories.tpprixnum.values,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startUpdateCategory: (group, update) => dispatch(startUpdateCategory(group, update)),
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(PriceSlider);