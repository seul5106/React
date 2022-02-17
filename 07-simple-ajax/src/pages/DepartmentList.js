import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { cloneDeep } from "lodash";

//리액트는 절대로 html건들지 말고 상태값만 변경하여 갱신한다. ajax 연동한번 더 하던지 가지고 있는 상태값으로 데이터를 찾아 삭제.
const DepartmentList = () => {
    // 화면에 표시할 상태값(ajax 연동 결과로 받아올 json) -> 초기값을 빈 배열로 정의
    const [department, setDepartment] = React.useState([]);

    // 페이지가 열림과 동시에 동작하는 hook.
    React.useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:3001/department");
                setDepartment(response.data);
            } catch (e) {
                console.log(e);
                alert("Ajax연동실패");
            }
        })();
    }, [/*변수 모니터링*/]);

    //갱신시 깊은복사를 수행하여야한다. 아에 값 주소 자체를 새로 할당할 것
    // Object.assign()은 1depth는 복사하는대 2depth부터는 못함

    //검색어 입력 요소에 연결할 참조 변수
    const myKeywordInput = React.useRef();

    //검색 버튼에 대한 클릭 이벤트
    const onButtonClick = async (e) => {
        try {
            const response = await axios.get("http://localhost:3001/department", {
                params: {
                    dname: myKeywordInput.current.value
                }
            });

            setDepartment(response.data);
        } catch (e) {
            console.error(e);
            alert("Ajax 연동 실패");
        }
    }


    const onDeleteClick = async e => {
        // 클릭된 자기 자신
        const current = e.currentTarget;
        // 클릭된 자신에게 숨어있는 data-id값을 추출
        const id = parseInt(current.dataset.id);

        // Ajax를 통한 데이터 삭제 요청
        try {
            await axios.delete(`http://localhost:3001/department/${id}`);
        } catch (e) {
            console.log(e);
            alert("Ajax연동실패");
        }

        // 삭제가 완료 되었다면 화면 갱신을 위해 status값도 갱신한다.
        // --> 상태값이 객체인 경우 깊은 복사 후 갱신해야 한다.
        const departmentCopy = cloneDeep(department);

        // 탐색을 수행하다가 콜백에서 true를 리턴하면 탐색을 중단하는 함수 사용
        departmentCopy.some((v,i) => {
            if(v.id === id){
                // 복사된 배열에서 삭제버튼과 일치하는 id값을 갖는 항목을 삭제
                departmentCopy.splice(i, 1);
                // 삭제된 결과를 상태값으로 갱신.
                setDepartment(departmentCopy);
                // 반복 중단을 위해서 true 리턴
                return true;
            }

            return false;
        });
    };

    return (
        <div>
            <h2>학과목록</h2>

            <form>
                <input type="text" name="keyword" ref={myKeywordInput} />
                <button type="button" onClick={onButtonClick}>
                    검색
                </button>
            </form>
            <hr />

            <table border='1'>
                <thead>
                    <tr>
                        <th>학과번호</th>
                        <th>학과명</th>
                        <th>학과위치</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {department.length > 0 ? (
                        department.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.dname}</td>
                                    <td>{item.loc}</td>
                                    <td>
                                        <button type="button" data-id={item.id} onClick={onDeleteClick}>삭제하기</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan='4' align='center'>
                                검색결과가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Link to='/department_add'>학과추가</Link>
        </div>
    );
};

export default DepartmentList;
