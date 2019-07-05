import React from 'react';
import { shallow } from 'enzyme';
import { FilterList } from '../../components/FilterList';
import { contentEx } from '../fixtures/content';

let wrapper, filters;

beforeEach( () => {
    filters = contentEx.groupBy;
    wrapper = shallow(<FilterList filters={filters} />)
});

test('Should render base filters', () => {
    expect(wrapper).toMatchSnapshot();
}); 