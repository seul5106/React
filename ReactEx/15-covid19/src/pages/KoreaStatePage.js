import React from "react";

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from "react-redux";

// 모듈기능 참조
import * as allReducer from "../reducers/AllReducer";

// CSS 참조
import style from "../assets/css/style.module.css";

// 컴포넌트 참조
import Meta from "../components/Meta";
import KoreaStateTable from '../components/KoreaStateTable';
import KoreaConfirmChart from '../components/KoreaConfirmChart';
import KoreaReleaseChart from '../components/KoreaReleaseChart';

// 로딩컴포넌트
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const KoreaStatePage = () => {
    /** Hook 기능을 통해 리덕스 상태값 가져오기 */
    const { result, loading, error } = useSelector((state) => {
        return {
            ...state.allReducer,
        };
    });

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    /** 컴포넌트가 화면에 나타날 때 실행되는 hook 정의 */
    // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
    React.useEffect(() => {
        dispatch(allReducer.allAsync());
    }, []);

    return (
        <div className="container containerTop">
            <Meta
                title="국내 발생 현황 ::: 리액트 코로나19 상황판"
                description="React.js로 구현한 코로나 19의 국내 발생 현황 상황판 입니다."
                keywords="React,코로나19,Covid19,국내발생현황"
            />

            <div className="page-header">
                <h2>코로나19 국내 발생 현황</h2>
            </div>

            {loading ? (
                <Loader
                    type="Bars"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        marginLeft: "-50px",
                        marginTop: "-50px",
                    }}
                />
            ) : (
                // 결과값(result)이 있을 때만 화면 출력
                // result.accState => {'기준시각': response.data.collection_datetime, '확진환자': 0, '격리해제': 0, '격리중': 0, '사망': 0}
                result && (
                    <div>
                        <KoreaStateTable accState={result.accState} />
                        <KoreaConfirmChart confirmState={result.confirmState} />
                        <KoreaReleaseChart releaseState={result.releaseState} />
                    </div>
                )
            )}
        </div>
    );
};

// 리덕스를 호출하는 페이지의 성능 향상을 위해
// React.memo()로 가공된 결과를 export 한다.
export default React.memo(KoreaStatePage);
