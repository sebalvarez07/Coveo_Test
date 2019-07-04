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
import { queryGenerator } from '../fixtures/query';
import { filterDefault } from '../fixtures/filters';
import { token } from '../fixtures/token';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

const createMockStore = configureStore([thunk]);

test('Should return promise with update category action', (done) => {
    const group = 'tpcategorie';
    const categoryUpdate = 'update';
    const store = createMockStore(undefined);

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

test('Should start update category action and dipatch setContent action', (done) => {
    const group = 'tpcategorie';
    const categoryUpdate = ['Vin rouge'];
    const storeValue = {filters: {...filterDefault}}
    const store = createMockStore({...storeValue});

    store.dispatch(startUpdateCategory(group, categoryUpdate)).then(res => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'UPDATE_CATEGORY',
            group,
            categoryUpdate
        });

        filterDefault['categories'][`${group}`]['values'] = [...categoryUpdate];
        // Test query generator with default query plus the value used for action above
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


test('Should return promise with update category LIMIT action', (done) => {
    const group = 'tpcategorie';
    const maxValueNum = 20;
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

test('Should return promise with update BASEFILTER action', (done) => {
    const baseFilter = ['Vin'];
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

