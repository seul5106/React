import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

/** 비동기 처리 함수 구현 */
export const getBookList = createAsyncThunk("BOOK/GET_LIST", async (payload, { rejectWithValue }) => {
    let result = null;

    if (payload) {
        try {
            result = await axios.get("https://dapi.kakao.com/v3/search/book", {
                params: { query: payload },
                headers: { Authorization: "KakaoAK 31b72a006ea45e5ecd1a886c66468091" }
            });
        } catch (err) {
            result = rejectWithValue(err.response);
        }
    }
    return result;
});

/** Slice 정의 (Action함수 + Reducer의 개념) */
const bookSlice = createSlice({
    // slice 별칭 
    name: 'book',
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
        [getBookList.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [getBookList.fulfilled]: (state, { payload }) => {

            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getBookList.rejected]: (state, { payload }) => {
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

export default bookSlice.reducer;