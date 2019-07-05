import React from 'react';
import { shallow } from 'enzyme';
import { FilterItem } from '../../components/FilterItem';
import { contentEx, contentEx_AllValues } from '../fixtures/content';

let startUpdateCategory, startUpdateCategoryLimit, wrapper, filter, filterName, checkedFilters;

beforeEach( () => {
    startUpdateCategory = jest.fn();
    startUpdateCategoryLimit = jest.fn();
    filter = contentEx_AllValues.groupBy[0].values;
    filterName = contentEx_AllValues.groupBy[0].field;
    checkedFilters = [];
    wrapper = shallow(<FilterItem 
                            startUpdateCategory={startUpdateCategory} 
                            startUpdateCategoryLimit={startUpdateCategoryLimit}
                            filter={filter}
                            filterName={filterName}
                            checkedFilters={checkedFilters}
                            />)
});

test('Should render base filters', () => {
    expect(wrapper).toMatchSnapshot();
}); 

test('Should handle startUpdateCategory when a category filter has been clicked', () => {
    // simulate mouseDown and pass the fake element's object 
    const name = 'Vin rouge';

    wrapper.find('#vin-rouge').simulate('change', {
        target: {
            name,
            checked: true
        }
    });

    expect(startUpdateCategory).toHaveBeenLastCalledWith(filterName, [name]);
});

// Only test when requesting more filters, and not 'less' filters, since adding more filters is the only one that requieres a call to the API
test('Should handle startUpdateCategoryLimit when requesting more filters from a category', () => {

    const name = 'more';
    // Set updated value limit manually based on the increase (5) from the initial value (5)
    const updatedValueLimit = 10;

    wrapper.find('.more-btn').simulate('mouseDown', {
        preventDefault: () => {},
        target: {
            name
        }
    });

    expect(startUpdateCategoryLimit).toHaveBeenLastCalledWith(filterName, updatedValueLimit);
});