import { 
    updateCategory, 
    startUpdateCategory, 
    updateCategoryLimit, 
    startUpdateCategoryLimit, 
    updateBaseFilter, 
    startUpdateBaseFilter, 
    searchByText, 
    startSearchByText, 
    updatePageNum, 
    startUpdatePageNum } from '../../actions/filters';
    
// Import fixtures and helpers for generating queries
import { queryGenerator } from '../fixtures/query';
// Import default filter state
import { filterDefault } from '../fixtures/filters';
// Import token for API
import { token } from '../fixtures/token';
// Thunk imports
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Import HTTP-Client
import axios from 'axios';

const createMockStore = configureStore([thunk]);

// Test updateCategory action
test('Should return promise with update category action', (done) => {

    // Declare test variables (don't have to be exact at this point)
    const group = 'tpcategorie';
    const categoryUpdate = 'update';
    // Initialize mock store
    const store = createMockStore(undefined);

    // Call action and send dispatch as argument in order to trigger action and ge promise back
    updateCategory(group, categoryUpdate, store.dispatch).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'UPDATE_CATEGORY',
            group,
            categoryUpdate
        });
        done();
    }).catch(error => {
        console.log(error);
    });
});

// Test for startUpdateCategory action. Using thunk to simulate dispatch
test('Should start update category action and dipatch setContent action', (done) => {

    // Test variables, have to be more precise
    const group = 'tpcategorie';
    const categoryUpdate = ['Vin rouge'];

    // Initialize store. Remember to add .filters as the action access getState().filters...
    const storeValue = {filters: {...filterDefault}}
    const store = createMockStore({...storeValue});

    store.dispatch(startUpdateCategory(group, categoryUpdate)).then(res => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'UPDATE_CATEGORY',
            group,
            categoryUpdate
        });

        // In this case, we can use default query, as testing results update is not possible
        const fullQuery = queryGenerator(filterDefault);

        return axios.post(`https://cloudplatform.coveo.com/rest/search?access_token=${token}`, {
            // Send query
            ...fullQuery
        });
    }).then(query => {
        // Test response success
        expect(query.status).toBe(200);
        done();
    })
});

// Test updateCategoryLimit action
test('Should return promise with update category LIMIT action', (done) => {

    // Test variables, dont have to be precise
    const group = 'tpcategorie';
    const maxValueNum = 20;

    // Initialize store. No need to specify filters here
    const store = createMockStore(undefined);

    updateCategoryLimit(group, maxValueNum, store.dispatch).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'UPDATE_CATEGORY_MAX_VALUE_NUM',
            group,
            maxValueNum
        });
        done();
    }).catch(error => {
        console.log(error);
    });
});

// Test for updateBaseFilter action. Using thunk to simulate dispatch
test('Should return promise with update BASEFILTER action', (done) => {

    // Test variables, have to be more precise
    const baseFilter = ['Vin'];
    // Initialize store. No need to specify filters here
    const store = createMockStore(undefined);

    updateBaseFilter(baseFilter, store.dispatch).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'UPDATE_BASE_FILTER',
            baseFilter
        });
        done();
    }).catch(error => {
        console.log(error);
    });
});

test('Should return promise with update SEARCH BY TEXT action', (done) => {
    
    const searchText = 'test';

    // Initialize store. No need to specify filters object here
    const store = createMockStore(undefined);

    searchByText(searchText, store.dispatch).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'SET_SEARCH_TEXT',
            searchText
        });
        done();
    }).catch(error => {
        console.log(error);
    });
});


test('Should return promise with update FIRST RESULT action (update page number)', (done) => {
    const firstResult = 0;
    const store = createMockStore(undefined);

    updatePageNum(firstResult, store.dispatch).then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: 'UPDATE_FIRST_RESULT',
            firstResult
        });
        done();
    }).catch(error => {
        console.log(error);
    });
});
