import React from 'react';
import { shallow } from 'enzyme';
import { BaseFilters } from '../../components/BaseFilters';

let startUpdateBaseFilter, wrapper;

beforeEach( () => {
    startUpdateBaseFilter = jest.fn();
    wrapper = shallow(<BaseFilters startUpdateBaseFilter={startUpdateBaseFilter} />)
});

test('Should render base filters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Should handle startUpdateBaseFilter when beer filter is clicked', () => {
    // simulate mouseDown and pass the fake element's object 
    wrapper.find('#beerFilter').simulate('mouseDown', {
        preventDefault: () => {},
        target: {
            closest: (btn) => {
                return {id: 'beerFilter'}
            }
        }
    });

    expect(startUpdateBaseFilter).toHaveBeenLastCalledWith(['Vin']);
});

test('Should handle startUpdateBaseFilter when wine filter is clicked', () => {
    // simulate mouseDown and pass the fake element's object 
    wrapper.find('#wineFilter').simulate('mouseDown', {
        preventDefault: () => {},
        target: {
            closest: (btn) => {
                return {id: 'wineFilter'}
            }
        }
    });

    expect(startUpdateBaseFilter).toHaveBeenLastCalledWith(['Bière']);
});

