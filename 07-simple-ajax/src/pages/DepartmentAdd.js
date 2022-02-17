import React from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";

// Route가 적용된 페이지는 props안에 history 객체가 포함되어 있다.
// --> 화면 이동 처리 기능 제공.
const DepartmentAdd = () => {
    // "react-router-dom"에서 제공하는 hook 기능을 사용하여 페이지 이동 처리를 수행하는 객체를 반환받는다.
    // 리액트에서는 location.href하면 안됨.
    const navigate = useNavigate();

    // form에서 submit이벤트가 발생할때 호출될 이벤트 핸들러.
    const onDepartmentSave = async e => {
        e.preventDefault();

        const dname = e.currentTarget.dname.value;
        const loc = e.currentTarget.loc.value;
        

        try {
            //POST 방식으로 전송할 파라미터 정의  NodeJs로 보낼때
            /* const form = new FormData();
            form.append("dname", dname);
            form.append("loc", loc); */

            //백엔드가 자바스크립트로 되어있으면 직접전송
            await axios.post("http://localhost:3001/department", {
                "dname" : dname,
                "loc": loc
            })

            navigate("/department_list");
        } catch (e) {
            console.error(e);
            alert("데이터 저장에 실패했습니다.");
        }
    };

    return (
        <div>
            <h2>학과추가</h2>
            <form onSubmit={onDepartmentSave}>
                <div>
                    <label htmlFor="dname">학과명</label>
                    <input type="text" name="dname" id="dname"/>
                </div>
                <div>
                    <label htmlFor="loc">학과위치</label>
                    <input type="text" name="loc" id="loc"/>
                </div>

                <button type="submit">저장하기</button>
            </form>
        </div>
    );
};

export default DepartmentAdd;
