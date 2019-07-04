import axios from 'axios';
import { token } from '../fixtures/helpers';
import { groupMaker, queryGenerator, parseBaseFilter } from '../fixtures/query';

export const setContent = (content) => {
    return {
        type: 'SET_CONTENT',
        content
    }
}

export const startSetContent = () => {
    return (dispatch, getState) => {
        
        const filters = getState().filters;

        const fullQuery = queryGenerator(filters);

        return axios.post(`https://cloudplatform.coveo.com/rest/search?access_token=${token}`, {
            // Send query
            ...fullQuery
            })
            .then(function (response) {
                // console.log('response', response);
                dispatch(setContent({
                    groupBy: response.data.groupByResults,
                    results: response.data.results,
                    resultsCount: response.data.totalCountFiltered
                }));
            })
            .catch(function (error) {
                console.log(error);
            }
        );
    }
}

export const updateCategoryLimit_Content = (group, groupValues) => {
    return {
        type: 'UPDATE_GROUP_LIMIT',
        group,
        groupValues
    }
}

export const startUpdateCategoryLimit_Content = (group, valueLimit) => {
    return (dispatch, getState) => {

        const baseFilter = parseBaseFilter(getState().filters.baseFilter);
        const groupUpdated = groupMaker(group, valueLimit, baseFilter);
        const query = {
            "groupBy": [
                { ...groupUpdated }
            ]
        }
        // console.log('query limit', query);
        return axios.post(`https://cloudplatform.coveo.com/rest/search?access_token=${token}`, {
            ...query
        }).then(result => {
            const groupValues = result.data.groupByResults[0];
            dispatch(updateCategoryLimit_Content(group, groupValues))
        })
    }
}