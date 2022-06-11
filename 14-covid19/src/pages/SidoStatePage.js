import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getNowList } from "../slices/NowSlice";
import { Oval } from "react-loader-spinner";

import SidoConfirmAccChart from "../components/SidoConfirmAccChart";
import SidoStateTable from "../components/SidoStateTable";

import style from "../assets/scss/style.module.scss";

const SidoStatePage = () => {

    // 리덕스 스토어에 저장되어 있는 상태값 받기
    const { rt, rtmsg, item, loading } = useSelector((state) => state.now);

    // 액션함수를 호출하기 위한 디스패치 함수 생성
    const dispatch = useDispatch();

    // query 값이 변경될 때만 실행되는 hook을 통해 액션함수 디스패치
    React.useEffect(() => {
        if (!loading) {
            dispatch(getNowList());
        }
    }, []);


    return (
        <div>
            {/** 로딩바 */}
            {loading && (
                <Oval
                    color="#ff6600"
                    height={100}
                    width={100}
                    wrapperStyle={{
                        position: "absolute",
                        left: "50%",
                        right: "50%",
                        marginLeft: "-50px",
                        marginTop: "-50px"
                    }}
                />
            )}

            {rt !== 200 ? (
                <div className={style.errmsg}>
                    <h3>{rt} Error</h3>
                    <p>{rtmsg}</p>
                </div>
            ) : (
                <div className={style.section}>
                    {item.result && (
                        <SidoConfirmAccChart 지역명={item.result.지역명} 누적확진자={item.result.누적확진자} />
                    )}
                    {item.state && (
                        <SidoStateTable state={item.state} />
                    )}
                </div>
            )}
        </div>
    );
};

export default SidoStatePage;