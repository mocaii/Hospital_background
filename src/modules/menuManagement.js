export const DISHES_LIST = 'menuManagement/DISHES_LIST';
export const MEAL_STATUS = 'menuManagement/MEAL_STATUS';
export const BATCH_UNSHELVE = 'menuManagement/BATCH_UNSHELVE';
export const DISTRICTS_DATA = 'menuManagement/DISTRICTS_DATA';


const initialState = {
    dishesList: [],
    mealStatus: "morning",
    batchUnshelve:[],
    districts:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DISHES_LIST:
            return {
                ...state,
                dishesList: action.data
            };
        case MEAL_STATUS:
            return {
                ...state,
                mealStatus: action.data
            };
        case BATCH_UNSHELVE:
            return {
                ...state,
                batchUnshelve: action.data
            };
        case DISTRICTS_DATA:
            return {
                ...state,
                districts: action.data
            }

        default:
            return state
    }
}

export const dispatch_func = {
    getDisdesList : (data) => {
        return dispatch => {
            dispatch({
                type: DISHES_LIST,
                data: data
            });
        }
    },
    mealStatusFunc : (data) => {
        return dispatch => {
            dispatch({
                type: MEAL_STATUS,
                data: data
            });
        }
    },
    getDistrictsFunc : (data) => {
        return dispatch => {
            dispatch({
                type: DISTRICTS_DATA,
                data: data
            });
        }
    },
    batchUnshelveFunc : (data) => {
        return dispatch => {
            dispatch({
                type: BATCH_UNSHELVE,
                data: data
            });
        }
    },


};