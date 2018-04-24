// import {SHOW_FORGET_PWD} from "./home";

// const SHOW_MODIFY_PWD = 'common/SHOW_MODIFY_PWD';
import {SHOW_FORGET_PWD} from "./home";

const PAGE_DATA = 'common/PAGE_DATA';

const initialState = {
    // showModifyPwd:false,
    pageData:{
        "pageNow": 1,
        "pageSize": 12,
        "totalCount": 3,
        "totalPageCount": 1,
        "startPos": 0,
        "hasFirst": false,
        "hasPre": false,
        "hasNext": true,
        "hasLast": true
    }
};

// const showModifyPwdReducer =  (showModifyPwd=false, action)=>{
//     switch(action.type)
//     {
//         case SHOW_MODIFY_PWD:
//             return action.data;
//         default:
//             return showModifyPwd
//     }
// };


// export default (state = initialState, action) => {
//     return {
//         showModifyPwd: showModifyPwdReducer(state.showModifyPwd, action)
//     };
// }


// export const dispatch_common_func = {
//     dispatch_show_modifyPwd: (data) => {
//         return dispatch => {
//             dispatch({
//                 type: SHOW_MODIFY_PWD,
//                 data: data
//             });
//         }
//     }
// }

export default (state = initialState, action) => {
    switch (action.type) {
        case PAGE_DATA:
            return {
                ...state,
                pageData: action.data
            };

        default:
            return state
    }
}

export const dispatch_common_func = {
    getPageData : (data) => {
        return dispatch => {
            dispatch({
                type: PAGE_DATA,
                data: data
            });
        }
    },


};























