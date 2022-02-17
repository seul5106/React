import { handleActions, createAction } from 'redux-actions';
import axios from 'axios';   // for ajax
import moment from 'moment'; // for 날짜 처리

/** 1) 상태값 - 단순한 json 객체. */
const initialState = {
    loading: false,     // 통신여부 (Ajax 시작시 true로 변경)
    result: null,       // 컴포넌트에 출력할 결과가 저장될 객체 (Ajax 연동 결과)
    error: false        // 에러 발생 여부 (실패시 true로 변경)
};

/** 2) 액션 - 컴포넌트가 겪는 상황을 구분하는 문자열 값 */
// --> 일반적으로 Ajax 처리를 수행할 때는 하나의 기능에 3개의 상태값을 둔다.
// 리스트 가져오기 시작 --> loading값을 true로, error는 false로 변경
const SEARCH_START   = 'movieRank/SEARCH_START';
// 리스트 가져오기 성공 --> loading과 error를 false로 변경, result를 할당한다.
const SEARCH_SUCCESS = 'movieRank/SEARCH_SUCCESS';
// 리스트 가져오기 실패 --> loading값을 false로, error는 true로 변경
const SEARCH_FAILURE = 'movieRank/SEARCH_FAILURE';

/** 3) 액션 생성 함수 - 액션 객체를 만들어서 리턴한다. */
// ReduxThunk에 의한 비동기 함수안에서 Ajax 처리 후, 결과를 반환하기 위해 이 함수들을 dispatch한다.
export const searchActionStart   = createAction(SEARCH_START);
export const searchSuccessAction = createAction(SEARCH_SUCCESS);
export const searchFailureAction = createAction(SEARCH_FAILURE);

/** 4) 리듀서를 활용하여 스토어에 연결할 Action 정의하기 */
// Ajax 연동 상황에 따라 미리 정의한 상태값을 갱신하기만 하면 된다.
export default handleActions(
    {
        // 리스트 가져오기 시작 --> loading값을 true로, error는 false로 변경
        [SEARCH_START]: (state = initialState, action) => {
            return {
                ...state,
                loading: true,
                error: false
            };
        },
        // 리스트 가져오기 성공 --> loading과 error를 false로 변경, result를 할당한다.
        [SEARCH_SUCCESS]: (state = initialState, action) => {
            return {
                ...state,
                // 백엔드에서 전달하는 JSON 데이터 전문은 항상 action.payload 로 전달된다. 
                // 이 값을 통째로 활용할 것인지, 일부만 활용할 것인지에 따라
                // result에 채워 넣을 값이 결정된다.
                loading: false,
                result: action.payload.result,
                error: false
            };
        },
        // 리스트 가져오기 실패 --> loading값을 false로, error는 true로 변경
        [SEARCH_FAILURE]: (state = initialState, action) => {
            return {
                ...state,
                loading: false,
                error: true
            };
        }
    },
    initialState
);

/** 5) 비동기 작업을 수행할 함수 정의 (ReduxThunk 적용) */
// 컴포넌트에서 이벤트가 발생한 경우나 useEffect()를 통해 특정 값이 변경된 경우 호출될 함수 하나만 정의하고
// 이 안에서 실행 결과를 반영하는 상태 함수를 선택적으로 호출하도록 구현한다.
export const movieRankAsync = (targetDt) => async dispatch => {
    /** 필요한 경우 백엔드에 전달할 변수값을 가공 */
    if (targetDt === undefined || targetDt === '') {
        // 검색에 필요한 날짜 변수가 없다면 기본값(1일전)을 생성해서 처리
        targetDt = moment().add(-1, 'd').format("YYYYMMDD");
    } else {
        // 검색에 필요한 날짜 변수가 있다면 "-" 기호는 삭제
        // 전체를 변경할 경우 `/변경할값/gi` 라고 명시 --> 정규표현식 사용
        targetDt = targetDt.replace(/-/gi, "");
    }

    /** Ajax 시작을 알림 --> 컴포넌트에서 로딩바를 표시하기 위함 */
    // 검색 시작 --> loading값을 true로, error는 false로 변경
    dispatch(searchActionStart());

    /** Ajax 구현 */
    // 예외처리: try 블록을 실행하는 도중 에러가 발생하면 그 즉시 처리를 중단하고 catch 블록으로 제어가 이동한다.
    try {
        // Ajax 연동 결과로 전달되는 JSON 전문은 response.data 로 접근할 수 있다.
        const apiUrl = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
        // 영화진흥위원회 api 장애로 인하여 임시 샘플 json 사용
        //const apiUrl = 'http://itpaper.co.kr/demo/react/movie_rank.php';
        const response = await axios.get(apiUrl, {
            // 연동 규격서에 명시된 요청 변수들 정의
            params: { key: '6d2cf4aa96725383235c717f2e569f1e', targetDt: targetDt }
        });

        // Ajax 결과를 로그에 출력해 보자!!!
        console.group("통신결과");
        console.debug(response);
        console.groupEnd();

        /** 필요한 경우 Ajax 결과를 가공한다. */
        const chartData = {movieNm: [], audiCnt: []}

        response.data.boxOfficeResult.dailyBoxOfficeList.forEach((v, i) => {
            chartData.movieNm[i] = v.movieNm;
            chartData.audiCnt[i] = v.audiCnt;
        });

        // 추려낸 값을 통신 결과에 병합한다.
        response.data.chartData = chartData;

        /** 통신처리 --> loading값을 false로, result는 채우고, error는 false로 처리 */
        // 여기서 전달하는 파라미터가 action 함수 안에서 `action.payload`가 된다.
        dispatch(searchSuccessAction({result: response.data}));
    } catch (e) {
        // 에러가 발생했음을 알림 --> loading값을 false로, error는 true로 변경
        dispatch(searchFailureAction());
    }
};