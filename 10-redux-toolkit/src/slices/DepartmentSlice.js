import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";

export const getList = createAsyncThunk("department/getList", async(payload, {rejectWithValue})=>{
    let result = null;

    try{
        result = await axios.get("http://localhost:3001/department");
    }catch(err){
        result = rejectWithValue(err.response);
    }
    
    return result;
});

export const departmentSlice = createSlice({
    name: "department",
    initialState: {
        rt: null,
        rtmsg: null,
        item: [],
        loading: false
    },

    reducers: {},

    extraReducers: {
        [getList.pending]: (state, {payload})=>{
            return {...state, loading: true}
        },
        [getList.fulfilled]: (state, {payload})=>{
            return {
                ...state, 
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
        [getList.rejected]: (state, {payload})=>{
             return {
                ...state, 
                rt: payload.status,
                rtmsg: payload.statusText,
                item: payload.data,
                loading: false
            }
        },
    }
});

export default departmentSlice.reducer;