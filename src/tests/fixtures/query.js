 // export const defaultCategory = "@tpcategorie=(Vin, Bière)";

export const groupAvailability = (maxValues = 3, queryOverride) => {
    return {
        "field": "@tpdisponibilite",
        "maximumNumberOfValues": maxValues,
        "sortCriteria": "occurrences",
        "injectionDepth": 1000,
        "completeFacetWithStandardValues": true,
        "allowedValues": [],
        "queryOverride": queryOverride
    }
}

export const groupCategory = (maxValues = 5, queryOverride) => {
    return {
        "field": "@tpcategorie",
        "maximumNumberOfValues": maxValues,
        "sortCriteria": "occurrences",
        "injectionDepth": 1000,
        "completeFacetWithStandardValues": true,
        "allowedValues": [],
        "queryOverride": queryOverride
    }
}

export const groupCountry = (maxValues = 5, queryOverride) => {
    return {
        "field": "@tppays",
        "maximumNumberOfValues": maxValues,
        "sortCriteria": "occurrences",
        "injectionDepth": 1000,
        "completeFacetWithStandardValues": true,
        "allowedValues": [],
        "queryOverride": queryOverride,
        "allowedValues": [
            "France",
            "Italie",
            "États-Unis",
            "Canada",
            "Espagne",
            "Royaume Uni",
            "Portugal",
            "Australie",
            "Chili",
            "Afrique du Sud",
            "Argentine",
            "Mexique",
            "Nouvelle-Zélande",
            "Allemagne",
            "Grèce",
            "Autriche",
            "Irlande",
            "Japon",
            "Liban",
            "Belgique",
            "Israël",
            "Hongrie",
            "Pays-Bas",
            "Suède",
            "Suisse",
            "Jamaïque"
        ]
    }
}

export const groupFormat = (maxValues = 5, queryOverride) => {
    return {
        "field": "@tpformat",
        "maximumNumberOfValues": maxValues,
        "sortCriteria": "occurrences",
        "completeFacetWithStandardValues": true,
        "allowedValues": [],
        "queryOverride": queryOverride
    }
}

export const groupColor = (maxValues = 5, queryOverride) => {
    return {
        "field": "@tpcouleur",
        "maximumNumberOfValues": maxValues,
        "sortCriteria": "occurrences",
        "completeFacetWithStandardValues": true,
        "allowedValues": [],
        "queryOverride": queryOverride
    }
}

export const groupPrice = (maxValues = 1, queryOverride) => {
    return {
        "field": "@tpprixnum",
        "completeFacetWithStandardValues": true,
        "generateAutomaticRanges": true,
        "sortCriteria": "nosort",
        "maximumNumberOfValues": maxValues,
        "queryOverride": queryOverride
    }
}

export const groupMaker = (category, maxValues, queryOverride = defaultCategory) =>  {
    const group = {
        tpdisponibilite: groupAvailability(maxValues, queryOverride),
        tpcategorie: groupCategory(maxValues, queryOverride),
        tppays: groupCountry(maxValues, queryOverride),
        tpformat: groupFormat(maxValues, queryOverride),
        tpcouleur: groupColor(maxValues, queryOverride),
    }
    return group[category]
}



/* 
-------------------------
------ QUERY PARSE ------
-------------------------
*/

const parseAQ = (categories, baseFilter) => {
    return Object.keys(categories).reduce((acc, currentCategory) => {
        
        const currentValues = categories[currentCategory]['values'];
        
        if(currentValues.length > 0) {
            const valArray = currentValues.map(value => '\"' + value + '\"');
            acc += `@${currentCategory}==(${valArray.join(',')})`;
        } 

        else if(currentValues.length === 0 && currentCategory === 'tpcategorie'){
            acc += baseFilter;
        }

        return acc;
        
    }, '');
}

export const parseBaseFilter = (baseFilter) => {
    return `@tpcategorie=(${baseFilter.join(',')})`;
}

const parseGroupBy = (categories, baseFilter) => {
    return Object.keys(categories).reduce((acc, curCategory) => {

        if(curCategory === 'tpprixnum') return acc;

        const currentCategory = categories[curCategory];
        const currentMaxValueNum = currentCategory['maxValueNum'];

        let groupObj = groupMaker(curCategory, currentMaxValueNum, baseFilter);

        if(currentCategory['values'].length > 0) {
            groupObj['allowedValues'] = [...currentCategory['values']]
        }

        acc.push(groupObj);
 
        return acc;

    }, []);
}

export const queryGenerator = (filters) => {
    const baseFilter = parseBaseFilter(filters.baseFilter)
    const aq = parseAQ(filters.categories, baseFilter);
    const groupBy = parseGroupBy(filters.categories, baseFilter);
    
    return {
        "q": filters.searchText,
        "aq": aq,
        "firstResult": filters.firstResult,
        "numberOfResults": filters.numberOfResults,
        "groupBy": groupBy
    }
}