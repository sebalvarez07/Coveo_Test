import filterReducer from '../../reducers/filter';
import { filterDefault } from '../fixtures/filters';

test('Should test the default action and return default state', () => {
    const state = filterReducer(undefined, '@@INIT');
    expect(state).toEqual(filterDefault);
});

test('Should update search by text filter ', () => {

    const action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Test Text'
    }

    const state = filterReducer(undefined, action);
    expect(state.searchText).toBe(action.searchText);
});

test('Should update category values', () => {

    const action = {
        type: 'UPDATE_CATEGORY',
        group: 'tpcategorie',
        categoryUpdate: ['Vin rouge']
    }

    const state = filterReducer(undefined, action);
    expect(state.categories[action.group].values).toBe(action.categoryUpdate);
});

test('Should update max value number of category', () => {

    const action = {
        type: 'UPDATE_CATEGORY_MAX_VALUE_NUM',
        group: 'tpcategorie',
        maxValueNum: 100
    }

    const state = filterReducer(undefined, action);
    expect(state.categories[action.group].maxValueNum).toBe(action.maxValueNum);
});

test('Should update base filter, reset categorie values and first result', () => {

    const action = {
        type: 'UPDATE_BASE_FILTER',
        baseFilter: ['Vin']
    }

    const customeFilter = {...filterDefault};
    customeFilter.firstResult = 100;
    customeFilter.categories.tpcategorie.values = ['Vin rouge']

    const state = filterReducer(customeFilter, action);

    expect(state).toEqual({
        ...filterDefault,
        baseFilter: action.baseFilter
    });
});

test('Should update first result', () => {

    const action = {
        type: 'UPDATE_FIRST_RESULT',
        firstResult: 200
    }

    const state = filterReducer(undefined, action);
    expect(state.firstResult).toBe(action.firstResult);
});

test('Should update result per page number', () => {

    const action = {
        type: 'UPDATE_RESULTS_NUM',
        numberOfResults: 200
    }

    const state = filterReducer(undefined, action);
    expect(state.resultsNum).toBe(action.numberOfResults);
});