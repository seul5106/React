import { combineReducers } from 'redux';

import movieRankReducer from './MovieRankReducer';

export default combineReducers({
    // 앞으로 추가될 모듈들이 이 위치에서 리덕스에 추가된다.
    movieRankReducer
});