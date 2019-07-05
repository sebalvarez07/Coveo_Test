import React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from '../../components/Pagination';
import { contentEx } from '../fixtures/content';

let wrapper, totalResults, numberOfResults, firstResult, startUpdatePageNum;

beforeEach( () => {
    totalResults = 100;
    numberOfResults = 20;
    firstResult = 40;
    startUpdatePageNum = jest.fn();
    wrapper = shallow(<Pagination 
                            totalResults={totalResults} 
                            numberOfResults={numberOfResults}
                            firstResult={firstResult}
                            startUpdatePageNum={startUpdatePageNum}
                            />)
});

test('Should render base filters', () => {
    expect(wrapper).toMatchSnapshot();
}); 

test('Should handle startUpdatePageNum when requesting the next page', () => {
    
    const currentPage = Math.ceil(firstResult / numberOfResults) + 1;
    // the equations is target = currentPage + 1 BUT later we do dataTarget - 1 (to get the right index)
    const target = currentPage + 1;     
    const nextFirstResult = (target - 1) * numberOfResults;

    wrapper.find('.next-btn').prop('onMouseDown')({
        target: {
           dataset: { target }
        }
    });

    expect(startUpdatePageNum).toHaveBeenLastCalledWith(nextFirstResult);
});


test('Should handle startUpdatePageNum when requesting the previous page', () => {
    
    const currentPage = Math.ceil(firstResult / numberOfResults) + 1;
    // the equations is target = currentPage + 1 BUT later we do dataTarget - 1 (to get the right index)
    const target = currentPage - 1;     
    const nextFirstResult = (target - 1) * numberOfResults;

    wrapper.find('.prev-btn').prop('onMouseDown')({
        target: {
           dataset: { target }
        }
    });

    expect(startUpdatePageNum).toHaveBeenLastCalledWith(nextFirstResult);
});

test('Should handle startUpdatePageNum when requesting any page', () => {
    
    // the equations is target = currentPage + 1 BUT later we do dataTarget - 1 (to get the right index)
    const target = 3;     
    const nextFirstResult = (target - 1) * numberOfResults;

    wrapper.find('.pagination-3').prop('onMouseDown')({
        target: {
           dataset: { target }
        }
    });

    expect(startUpdatePageNum).toHaveBeenLastCalledWith(nextFirstResult);
});