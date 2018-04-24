export const TODAY_MENU_LIST = 'todayMenu/TODAY_MENU_LIST';
export const MEAL_STATUS = 'todayMenu/MEAL_STATUS';
export const BATCH_UNSHELVE = 'todayMenu/BATCH_UNSHELVE';


const initialState = {
    todayMenuList: [],
    mealStatus: "morning",
    batchUnshelve:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TODAY_MENU_LIST:
            return {
                ...state,
                todayMenuList: action.data
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

        default:
            return state
    }
}

export const dispatch_func = {
    getTodayMenuList : (data) => {
        return dispatch => {
            dispatch({
                type: TODAY_MENU_LIST,
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
    batchUnshelveFunc : (data) => {
        return dispatch => {
            dispatch({
                type: BATCH_UNSHELVE,
                data: data
            });
        }
    },


};