import React from 'react';

import {useSelector, useDispatch} from "react-redux";

import {plusAsync, minusAsync} from "../reducer/CounterReducer";

const UseReduxHookCounter = () =>{
    const {number, color} = useSelector(state => state.counterReducer);

    const dispatch = useDispatch();

    return(
        <div>
            <h2>UseReduxHookCounter</h2>
            <h3 style={{color}}>{number}</h3>
            <div>
                <button onClick={(e)=> {dispatch(plusAsync(15));}}>+15</button>
                <button onClick={(e)=> {dispatch(minusAsync(3));}}>-3</button>
            </div>
        </div>
    )
}

export default React.memo(UseReduxHookCounter);