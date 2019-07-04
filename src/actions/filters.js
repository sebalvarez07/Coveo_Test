import { startSetContent, startUpdateCategoryLimit_Content } from './content';

export const updateCategory = (group, categoryUpdate, dispatch) => {
    return new Promise(resolve => {
        dispatch({
            type: 'UPDATE_CATEGORY',
            group,
            categoryUpdate
        });
        resolve();
    });
}

export const startUpdateCategory = (group, aqUpdate) => {
    return (dispatch) => {
        return updateCategory(group, aqUpdate, dispatch).then(resolve => {
            dispatch(startSetContent());
        });
    }
}

export const updateCategoryLimit = (group, maxValueNum, dispatch) => {
    return new Promise(resolve => {
        dispatch({
            type: 'UPDATE_CATEGORY_MAX_VALUE_NUM',
            group,
            maxValueNum
        });
        resolve();
    });
}

export const startUpdateCategoryLimit = (group, maxValueNum) => {
    return dispatch => {
        updateCategoryLimit(group, maxValueNum, dispatch).then(res => {
            dispatch(startUpdateCategoryLimit_Content(group, maxValueNum));
        })    
    }
}

export const updateBaseFilter = (baseFilter, dispatch) => {
    return new Promise(resolve => {
        dispatch({
            type: 'UPDATE_BASE_FILTER',
            baseFilter
        });
        resolve();
    });
}

export const startUpdateBaseFilter = (baseFilter) => {
    return dispatch => {
        updateBaseFilter(baseFilter, dispatch).then(res => {
            dispatch(startSetContent());
        })    
    }
}

const searchByText = (searchText, dispatch) => {
    return new Promise(resolve => {
        dispatch({
            type: 'SET_SEARCH_TEXT',
            searchText
        });
        resolve();
    });
}

export const startSearchByText = (searchText) => {
    return dispatch => {
        searchByText(searchText, dispatch).then(res => {
            dispatch(startSetContent());
        })
    }
}

const updatePageNum = (firstResult, dispatch) => {
    return new Promise(resolve => {
        dispatch({
            type: 'UPDATE_FIRST_RESULT',
            firstResult
        });
        resolve();
    });
}

export const startUpdatePageNum = (firstResult) => {
    return dispatch => {
        updatePageNum(firstResult, dispatch).then(res => {
            dispatch(startSetContent());
        })
    }
}