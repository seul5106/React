import React from 'react';

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from "react-redux";

// 모듈기능 참조
import * as nowReducer from "../reducers/NowReducer";

// CSS 참조
import style from "../assets/css/style.module.css";

// 컴포넌트 참조
import Meta from "../components/Meta";
import SidoConfirmAccChart from '../components/SidoConfirmAccChart';
import SidoStateTable from '../components/SidoStateTable';

// 로딩컴포넌트
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const SidoStatePage = () => {
    /** Hook 기능을 통해 리덕스 상태값 가져오기 */
    const { result, loading, error } = useSelector((state) => {
        return {
            ...state.nowReducer,
        };
    });

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    /** 컴포넌트가 화면에 나타날 때 실행되는 hook 정의 */
    // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
    React.useEffect(() => {
        dispatch(nowReducer.nowAsync());
    }, []);

    return (
        <div className='container containerTop'>
            
            <Meta title='시도별 발생 동향 ::: 리액트 코로나19 상황판' description='React.js로 구현한 코로나 19의 시도별 발생 동향 상황판 입니다.' keywords='React,코로나19,Covid19,시도별발생동향' />

            <div className='page-header'>
                <h2>시도별 발생 동향</h2>
            </div>

            {loading ? (
                <Loader
                    type='Bars'
                    color='#00BFFF'
                    height={100}
                    width={100}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-50px',
                        marginTop: '-50px',
                    }}
                />
            ) : (
                // 결과값(result)이 있을 때만 화면 출력
                result && (
                    <div>
                        <SidoConfirmAccChart chartData={result.chartData} />
                        <SidoStateTable state={result.state} />
                    </div>
                )
            )}
        </div>
    );
};

// 리덕스를 호출하는 페이지의 성능 향상을 위해
// React.memo()로 가공된 결과를 export 한다.
export default React.memo(SidoStatePage);