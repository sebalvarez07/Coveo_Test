export const filterDefault = {
    searchText: '',
    categories: {
        "tpcategorie": {
            values: [],
            maxValueNum: 5
        },
        "tpdisponibilite": {
            values: [],
            maxValueNum: 5
        },
        "tppays": {
            values: [],
            maxValueNum: 5
        },
        "tpcouleur": {
            values: [],
            maxValueNum: 5
        },
        "tpformat": {
            values: [],
            maxValueNum: 5
        },
        "tpprixnum": {
            values: [],
            maxValueNum: 1
        }
    },
    baseFilter: ['Vin', 'Bière'],
    firstResult: 0,
    numberOfResults: 10
} 
 
const filterReducer = (state = filterDefault, action) => {
    const categories = {...state.categories};

    switch(action.type) {
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                firstResult: 0,
                searchText: action.searchText
            };
        case 'UPDATE_CATEGORY':
            categories[action.group].values = action.categoryUpdate;
            return {
                ...state,
                firstResult: 0,
                categories: categories
            };
        case 'UPDATE_CATEGORY_MAX_VALUE_NUM':
            categories[action.group].maxValueNum = action.maxValueNum;
            return {
                ...state,
                categories: categories
            };
        case 'UPDATE_BASE_FILTER':
            // Clear all filters
            Object.keys(categories).forEach(categorie => categories[categorie].values = [])
            return {
                ...state,
                firstResult: 0,
                categories: categories,
                baseFilter: action.baseFilter
            };
        case 'UPDATE_FIRST_RESULT':
            return {
                ...state,
                firstResult: action.firstResult
            };
        case 'UPDATE_RESULTS_NUM':
            return {
                ...state,
                firstResult: 0,
                resultsNum: action.numberOfResults
            };
        case 'REMOVE_FILTER_VALUE': 
            let updatedValues = categories[action.group].values.filter(value => value !== action.value);
            categories[action.group].values = updatedValues;
            return {
                ...state,
                categories
            }

        default:
            return state;
    }
}

export default filterReducer;