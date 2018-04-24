export const ACCOUNT_DATA = 'accountManagement/ACCOUNT_DATA';

const initialState = {
    accountData: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_DATA:
            return {
                ...state,
                accountData: action.data
            };

        default:
            return state
    }
}

export const dispatch_func = {
    getAccountData : (data) => {
        return dispatch => {
            dispatch({
                type: ACCOUNT_DATA,
                data: data
            });
        }
    },


};