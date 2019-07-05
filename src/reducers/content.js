const contentReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_CONTENT':
            return action.content;

        case 'UPDATE_GROUP_LIMIT':
            const updatedGroup = state.groupBy.map(group => {
                if(group.field === action.group) {
                    return action.groupValues
                }
                return group
            })
            return {
                ...state,
                groupBy: updatedGroup,
            }
        default:
            return state;
    }
}

export default contentReducer;