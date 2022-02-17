import React from 'react';

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from 'react-redux';
// 액션이 발생한 경우 호출할 함수 (Redux-Thunk 적용 전)
// import { plusAction, minusAction } from '../reducers/CounterReducer';
// 액션이 발생한 경우 호출할 함수 (Redux-Thunk 적용 후)
import { plusAsync, minusAsync } from '../reducers/CounterReducer';

const UseReduxHookCounter = () => {
    /** Hook 기능을 통해 상태값 가져오기 */
    // -> useSelector()함수에 전달하는 콜백함수가 호출되면서 state 파라미터로 module의 상태값들이 전달된다.
    //    이 상태값들 중 사용하고자 하는 값들만 별도의 JSON으로 묶어 리턴받아 사용한다.
    const { number, color } = useSelector(state => state.counterReducer);

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    return (
        <div>
            <h2>UseReduxHookCounter</h2>
            <h3 style={{color: color}}>{number}</h3>
            <div>
                <button onClick={(e) => { dispatch(plusAsync(15)); }}>+1</button>
                <button onClick={(e) => { dispatch(minusAsync(3)); }}>-1</button>
            </div>
        </div>
    );
};


/*
    connect 함수를 사용하여 컨테이너 컴포넌트를 만들었을 경우,
    해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링될 때 
    해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성능이 최적화되지만,
    
    반면 useSelector를 사용하여 리덕스 상태를 조회했을 때는
    이 최적화 작업이 자동으로 이루어지지 않으므로,
    성능 최적화를 위해서는 React.memo를 컨테이너 컴포넌트에 사용해 주어야 한다.

    이 컨테이너는 CounterModule을 ContainerCounter와 공유하고 있기 때문에
    상태값과 액션 함수도 공유된다.
*/
export default React.memo(UseReduxHookCounter);