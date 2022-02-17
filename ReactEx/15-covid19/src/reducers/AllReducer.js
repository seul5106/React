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
const SEARCH_START   = 'covidAll/SEARCH_START';
// 리스트 가져오기 성공 --> loading과 error를 false로 변경, result를 할당한다.
const SEARCH_SUCCESS = 'covidAll/SEARCH_SUCCESS';
// 리스트 가져오기 실패 --> loading값을 false로, error는 true로 변경
const SEARCH_FAILURE = 'covidAll/SEARCH_FAILURE';

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
export const allAsync = () => async dispatch => {
    /** Ajax 시작을 알림 --> 컴포넌트에서 로딩바를 표시하기 위함 */
    // 검색 시작 --> loading값을 true로, error는 false로 변경
    dispatch(searchActionStart());

    /** Ajax 구현 */
    // 예외처리: try 블록을 실행하는 도중 에러가 발생하면 그 즉시 처리를 중단하고 catch 블록으로 제어가 이동한다.
    try {
        // Ajax 연동 결과로 전달되는 JSON 전문은 response.data 로 접근할 수 있다.
        const apiUrl = 'http://itpaper.co.kr/demo/covid19/all.php';
        const response = await axios.get(apiUrl);

        /** 통신결과 중에서 각 컴포넌트에 전달할 값을 추려낸다. */

        // 1) 누적 확진자 현황
        const accState = {'기준시각': response.data.collection_datetime, '확진환자': 0, '격리해제': 0, '격리중': 0, '사망': 0};

        // 2) 일주일간의 확진자 현황
        const confirmState = {'날짜': [], '누적확진': [], '일일확진': []}

        // 3) 일주일간의 격리해제 현황
        const releaseState = {'날짜': [], '누적격리해제': [], '일일격리해제': []}

        // 지역별 데이터만 추출
        // --> response.data는 ajax를 통해 얻은 json 결과.
        // --> response.data.data는 ajax결과 안에 포함된 data라는 이름의 key
        const cityData = response.data.data;

        // 지역명만 추출 (json의 key만 추출)
        const cityNames = Object.getOwnPropertyNames(cityData);
        console.debug(cityNames);

        // 지역수 만큼 반복
        cityNames.forEach((v, p) => {
            // 도시 하나를 추출한다. --> 배열형태임
            const cityItem = cityData[v];
            console.group(v);
            console.debug(cityItem);
            console.groupEnd();

            // 가장 마지막 원소를 가져온다(가장 최근 데이터)
            const lastIndex = cityItem.confirmed_acc.length - 1;

            // 전국 데이터를 모아야 하므로 각 도시 값을 합산한다.
            accState.확진환자 += cityItem.confirmed_acc[lastIndex];
            accState.격리해제 += cityItem.released_acc[lastIndex];
            accState.격리중 += cityItem.active[lastIndex];
            accState.사망 += cityItem.death_acc[lastIndex];

            // 일주일 전에 해당하는 위치를 가리키는 인덱스
            const weekIndex = cityItem.confirmed_acc.length - 8;

            // 일주일치를 반복(i=ajax로 가져온 전체 배열의 index, j는 그래프용으로 생성한 weekState의 index)
            for (let i=weekIndex, j=0; i<cityItem.confirmed_acc.length; i++, j++) {
                // `confirmState.날짜` 배열에 cityItem.date[i] 과 일치하는 값의 위치를 검색
                // --> 일치하는 정보가 없다면(=신규로 추가되는 데이터라면?) -1이 반환됨.
                if (confirmState.날짜.indexOf(cityItem.date[i]) === -1) {
                    // 신규 항목이므로 데이터 추가
                    confirmState.날짜.push(cityItem.date[i]);
                    confirmState.누적확진.push(parseInt(cityItem.confirmed_acc[i]));
                    confirmState.일일확진.push(parseInt(cityItem.confirmed[i]));
                    releaseState.날짜.push(cityItem.date[i]);
                    releaseState.누적격리해제.push(parseInt(cityItem.released_acc[i]));
                    releaseState.일일격리해제.push(parseInt(cityItem.released[i]));
                } else {
                    confirmState.누적확진[j] += parseInt(cityItem.confirmed_acc[i]);
                    confirmState.일일확진[j] += parseInt(cityItem.confirmed[i]);
                    releaseState.누적격리해제[j] += parseInt(cityItem.released_acc[i]);
                    releaseState.일일격리해제[j] += parseInt(cityItem.released[i]);
                }
            }
        });

        // 추출한 값을 통신 결과에 병합한다.
        response.data.accState = accState;
        response.data.confirmState = confirmState;
        response.data.releaseState = releaseState;

        console.group("누적 확진자 현황");
        console.debug(accState);
        console.groupEnd();

        console.group("일주일간의 확진자 현황");
        console.debug(confirmState);
        console.groupEnd();

        console.group("일주일간의 격리해제 현황");
        console.debug(releaseState);
        console.groupEnd();

        // Ajax 결과를 로그에 출력해 보자!!!
        console.group("통신결과");
        console.debug(response);
        console.groupEnd();

        /** 통신처리 --> loading값을 false로, result는 채우고, error는 false로 처리 */
        // 여기서 전달하는 파라미터가 action 함수 안에서 `action.payload`가 된다.
        dispatch(searchSuccessAction({result: response.data}));
    } catch (e) {
        console.error(e);
        // 에러가 발생했음을 알림 --> loading값을 false로, error는 true로 변경
        dispatch(searchFailureAction());
    }
};