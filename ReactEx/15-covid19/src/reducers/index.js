import { combineReducers } from 'redux';

// 백엔드 URL이 늘어날 때마다 리듀서 모듈도 함께 늘어난다.
import allReducer from './AllReducer';
import nowReducer from './NowReducer';

export default combineReducers({
    allReducer,
    nowReducer
});