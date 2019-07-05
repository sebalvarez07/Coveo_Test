import React from 'react';
import { connect } from 'react-redux';
import { startUpdateBaseFilter } from '../actions/filters';

export class BaseFilters extends React.Component {

    constructor (props) {
        super(props);
        this.beerButton = React.createRef();
        this.wineButton = React.createRef();
        this.state = {
            beerActive: true,
            wineActive: true
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevState.beerActive !== this.state.beerActive) {
            this.beerButton.current.classList.toggle('active-base');
        }
        
        if(prevState.wineActive !== this.state.wineActive) {
            this.wineButton.current.classList.toggle('active-base');
        }
    }
    
    dispatchBaseFilter = () => {
        let baseFilter;
        const beerActive = this.state.beerActive;
        const wineActive = this.state.wineActive;

        if(beerActive === wineActive) {
            baseFilter = ['Bière', 'Vin'];
        }
        else if(beerActive && !wineActive) {
            baseFilter = ['Bière'];
        }
        else if(!beerActive && wineActive) {
            baseFilter = ['Vin'];
        }

        this.props.startUpdateBaseFilter(baseFilter);
    }

    handleBaseFilter = (e) => {
        e.preventDefault(); 
        const btn = e.target.closest('.base-filter__btn');

        if(btn.id === 'beerFilter') {
            this.setState(prevState => (
                {
                    beerActive: !prevState.beerActive
                }
                ), this.dispatchBaseFilter);
        }
        else {
            this.setState(prevState => (
                {
                    wineActive: !prevState.wineActive
                }
                ), this.dispatchBaseFilter);
        }
    }

    render () {
        return (
            <div className='base-filter header__el'>
                <span 
                    ref={this.beerButton}
                    className='base-filter__btn active-base'
                    id={'beerFilter'}
                    onMouseDown={this.handleBaseFilter}
                >
                    <i className="ionicons ion-ios-pint"></i>
                    <span className='base-filter__label'>
                        Beer
                    </span>
                </span>
                <span
                    ref={this.wineButton}
                    className='base-filter__btn active-base'
                    id={'wineFilter'}
                    onMouseDown={this.handleBaseFilter}
                >
                    <i className="ionicons ion-ios-wineglass"></i>
                    <span className='base-filter__label'>
                        Wine
                    </span>
                </span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startUpdateBaseFilter: (baseFilter) => dispatch(startUpdateBaseFilter(baseFilter))
    }
}
 
export default connect(undefined, mapDispatchToProps)(BaseFilters);