import contentReducer from '../../reducers/content';
import { contentEx, valuesUpdate } from '../fixtures/content';

test('Should test the default action and return default state', () => {
    const state = contentReducer(undefined, '@@INIT');
    expect(state).toEqual({});
});

test('Should test the set content action action and return new state', () => {
    const action = {
        type: 'SET_CONTENT',
        content: contentEx
    }
    const state = contentReducer(undefined, action);
    expect(state).toEqual(contentEx);
});

test('Should test the update category limit function and return added values on the right category', () => {
    const action = {
        type: 'UPDATE_GROUP_LIMIT',
        group: 'tpcategorie',
        groupValues: [...valuesUpdate]
    }

    const contentExPlus = { ...contentEx };
    contentExPlus.groupBy[0] = [...valuesUpdate];

    const state = contentReducer(contentEx, action);
    expect(state).toEqual(contentExPlus);
});