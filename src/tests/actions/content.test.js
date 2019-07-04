// Import actions
import { setContent, startSetContent, updateCategoryLimit_Content, startUpdateCategoryLimit_Content } from '../../actions/content';
// Import fixtures and helpers for generating queries
import { queryGenerator, groupMaker, parseBaseFilter } from '../fixtures/query';
// Import default filter state
import { filterDefault } from '../fixtures/filters';
// Import token for API
import { token } from '../fixtures/token';
// Thunk imports
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// Import HTTP-Client
import axios from 'axios';

// Declare mockstore 
const createMockStore = configureStore([thunk]);

// Test for setContent action
test('Should return setContent action with appropriate type and content object', () => {
    const content = {test: 'test'}
    const action = setContent(content);

    expect(action).toEqual({
        type: 'SET_CONTENT',
        content
    });
});

// Test for startSetContent action. Using thunk to simulate dispatch
test('Should dispatch setContent and make call to API with query', (done) => {

    // Initialize store. Remember to add .filters as the action access getState().filters...
    const storeValue = {filters: {...filterDefault}}
    const store = createMockStore({...storeValue});

    // Dispatch action and test subsequent action calls
    store.dispatch(startSetContent()).then(res => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_CONTENT',
            content: expect.any(Object)
        });

        // Use queryGenerator to generate query, same as the actual action does it
        const fullQuery = queryGenerator(filterDefault);

        return axios.post(`https://cloudplatform.coveo.com/rest/search?access_token=${token}`, {
            // Send query
            ...fullQuery
        });
    }).then(query => {
        // Test Number of results matches the numberOfResults property of filter object
        expect(query.data.results.length).toBe(filterDefault.numberOfResults);
        done();
    })
});

// Test for updateCategoryLimit_Content
test('Should return action to update filter category limit', () => {
    const group = 'tpcategory';
    const groupValues = {'field': '@tpcategory'}
    const action = updateCategoryLimit_Content(group, groupValues);

    expect(action).toEqual({
        type: 'UPDATE_GROUP_LIMIT',
        group,
        groupValues
    });
});

// Test for startUpdateCategoryLimit_Content action. Using thunk to simulate dispatch
test('Should dispatch update category limit content and make call to API with query', (done) => {

    //Test variables to check for category value limit query resutls
    const group = 'tpcategorie';
    const valueLimit = 20;

    // Initialize store. Remember to add .filters as the action access getState().filters...
    const storeValue = {filters: {...filterDefault}}
    const store = createMockStore({...storeValue});

    // Dispatch action and test subsequent action calls
    store.dispatch(startUpdateCategoryLimit_Content(group, valueLimit)).then(res => {

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'UPDATE_GROUP_LIMIT',
            group,
            groupValues: expect.any(Object)
        });
        
        // Set same variables as the actual action in order to quest query and methods
        const baseFilter = parseBaseFilter(store.getState().filters.baseFilter);
        const groupUpdated = groupMaker(group, valueLimit, baseFilter);
        const groupQuery = {
            "groupBy": [
                { ...groupUpdated }
            ]
        }

        return axios.post(`https://cloudplatform.coveo.com/rest/search?access_token=${token}`, {
            // Send query
            ...groupQuery
        });
    }).then(query => {

        // Test that the query return the right field with the requested values
        expect(query.data.groupByResults[0]['field']).toBe(group);
        expect(query.data.groupByResults[0]['values'].length).toBe(valueLimit);
        done();
    })
});