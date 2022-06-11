import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

/** 비동기 처리 함수 구현 */
export const getBlogList = createAsyncThunk("BLOG/GET_LIST", async (payload, { rejectWithValue }) => {
    let result = null;
    if (payload.query) {
        try {
            const apiUrl = "https://dapi.kakao.com/v2/search/blog"
            result = await axios.get(apiUrl, {
                params: { query: payload.query, page: payload.page, size: 20 },
                headers: { Authorization: 'KakaoAK 31b72a006ea45e5ecd1a886c66468091' }
            });
        } catch (err) {
            result = rejectWithValue(err.response);
        }
    }
    return result;
});

/** Slice 정의 (Action함수 + Reducer의 개념) */
const newsSlice = createSlice({
    // slice 별칭 
    name: 'blog',
    // 상태값 구조 정의 
    initialState: {
        rt: null,           // HTTP 상태 코드(200,404,500 등) 
        rtmsg: null,        // 에러메시지 
        item: [],           // Ajax 처리를 통해 수신된 데이터 
        loading: false      // 로딩 여부 
    },
    // 내부 action 및 동기 action 
    reducers: {},
    // 외부 action 및 비동기 action 
    extraReducers: {
        [getBlogList.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [getBlogList.fulfilled]: (state, {meta, payload }) => {
            // 1페이지가 아닌 경우에는 리덕스에 저장되어 있는 현재 데이터에 새로 받아온 데이터를 병합하여 Ajax의 결과를 재구성한다.
            if(meta.arg.page>1){
                payload.data.documents = state.item.documents.concat(payload.data.documents);
            }
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getBlogList.rejected]: (state, { payload }) => {
            return {
                ...state,
                rt: payload?.status ? payload.status : '500',
                rtmsg: payload?.statusText ? payload.statusText : 'Server Error',
                item: payload?.data,
                loading: false,
            }
        }
    },
});

export default newsSlice.reducer;