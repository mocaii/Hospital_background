import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import home from './home'
import common from './common'
import accountManagement from './accountManagement'
import todayMenu from './todayMenu'
import menuManagement from './menuManagement'

export default combineReducers({
    router: routerReducer,
    home,
    common,
    accountManagement,
    todayMenu,
    menuManagement
})