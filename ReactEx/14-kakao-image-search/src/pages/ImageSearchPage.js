import React from "react";

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from "react-redux";

// 모듈기능 참조
import * as kakaoImageSearchReducer from "../reducers/KakaoImageSearchReducer";

// CSS 참조
import style from "../assets/css/style.module.css";

// 컴포넌트 참조
import Meta from "../components/Meta";
import ImageList from "../components/ImageList";

// 로딩컴포넌트
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const ImageSearchPage = ({ match }) => {
    /** Hook 기능을 통해 리덕스 상태값 가져오기 */
    // --> (2) 리듀서 모듈에서 정의한 상태값들을 비구조 문법으로 추출
    const { result, loading, error } = useSelector((state) => {
        return {
            // (1) 리듀서 모듈이 콜백함수의 state 파라미터에 포함되어 전달된다.
            // 이 값을 리턴하면 24라인에서 선언한 비구조 문법에 의해 상태값을 추출할 수 있다.
            ...state.kakaoImageSearchReducer,
        };
    });

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    /** match 값이 변경될 때만(=URL에 정의된 path파라미터가 변경될 때만) 실행되는 hook 정의 */
    // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
    React.useEffect(() => {
        // path파라미터 중에서 query라는 이름의 변수를 추출하여 리듀스 모듈 내의 함수에 전달한다.
        const { query } = match.params;
        dispatch(kakaoImageSearchReducer.kakaoImageSearchAsync(query));
    }, [match]);

    return (
        <div>
            <div className={style.containerTop}>
                {/* 검색어가 존재한다면 새로운 검색 페이지라는 의미 */}
                {match.params.query && (
                    <Meta
                        title={["카카오 이미지 검색(",match.params.query,")",].join("")}
                        description={["React.js로 구현한",match.params.query,"에 대한 이미지 검색 결과 입니다.",].join(" ")}
                        keywords={["React","카카오","이미지검색",match.params.targetDt,].join(",")}
                    />
                )}

                {/* 로딩바 및 검색 결과 */}
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
                    result && <ImageList documents={result.documents} />
                )}
            </div>
        </div>
    );
};

export default React.memo(ImageSearchPage);
