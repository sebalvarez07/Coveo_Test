import filterReducer, { filterDefault } from '../../reducers/filter';

test('Should test the default action return default state', () => {
    const state = filterReducer(undefined, '@@INIT');
    expect(state).toEqual(filterDefault);
});

// test('Should test the login action and return the state with user uid', () => {
//     const action = {
//         type: 'LOGIN',
//         uid: '123abc',
//     };
//     const state = authReducer(undefined, action);
//     expect(state).toEqual({
//         uid: '123abc'
//     });    
// });

// test('Should test the lout action and return an empty state', () => {
//     const action = { type: 'LOGOUT' };
//     const defaultState = { uid: '123abc' };
//     const state = authReducer(defaultState, action);
//     expect(state).toEqual({});    
// });