import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

/** 비동기 처리 함수 구현 */
export const getList = createAsyncThunk("GET_LIST", async (payload, {rejectWithValue }) => {
    let result = null;

    try {
        result = await axios.get("https://newsapi.org/v2/top-headlines", {
            params: {
                apiKey: "f484e8320e9b4d348ab4c43cf345b128",
                country: "kr",
                category: payload
            }
        });
    } catch (err) {
        result = rejectWithValue(err.response);
    }

    return result;
});

/** Slice 정의 (Action함수 + Reducer의 개념) */
const newsSlice = createSlice({
    // slice 별칭 
    name: 'news',
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
        [getList.pending]: (state, { payload }) => {
            return { ...state, loading: true }
        },
        [getList.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getList.rejected]: (state, { payload }) => {
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