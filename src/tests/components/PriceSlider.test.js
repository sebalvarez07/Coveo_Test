import React from 'react';
import { shallow } from 'enzyme';
import { PriceSlider } from '../../components/PriceSlider';

let wrapper, startUpdateCategory;

beforeEach( () => {
    startUpdateCategory = jest.fn();
    wrapper = shallow(<PriceSlider startUpdateCategory={startUpdateCategory} />)
});

test('Should render base filters', () => {
    expect(wrapper).toMatchSnapshot();
}); 

test('Should handle startUpdateCategory when slider is changed', () => {
    // simulate mouseDown and pass the fake element's object 
    const valuesOG = [20, 100];
    const valuesProcessed = `${valuesOG[0]}..${valuesOG[1]}`;
    const filterName = 'tpprixnum';

    wrapper.find('SliderComponent').prop('onChange')(valuesOG);

    expect(startUpdateCategory).toHaveBeenLastCalledWith(filterName, [valuesProcessed]);
});