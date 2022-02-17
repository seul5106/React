import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { cloneDeep } from "lodash";

//리액트는 절대로 html건들지 말고 상태값만 변경하여 갱신한다. ajax 연동한번 더 하던지 가지고 있는 상태값으로 데이터를 찾아 삭제.
const StudentList = () => {
    // 화면에 표시할 상태값(ajax 연동 결과로 받아올 json) -> 초기값을 빈 배열로 정의
    const [student, setStudent] = React.useState([]);

    // 페이지가 열림과 동시에 동작하는 hook.
    React.useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:3001/student");
                setStudent(response.data);
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
            const response = await axios.get("http://localhost:3001/student", {
                params: {
                    name: myKeywordInput.current.value
                }
            });

            setStudent(response.data);
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
            await axios.delete(`http://localhost:3001/student/${id}`);
        } catch (e) {
            console.log(e);
            alert("Ajax연동실패");
        }

        // 삭제가 완료 되었다면 화면 갱신을 위해 status값도 갱신한다.
        // --> 상태값이 객체인 경우 깊은 복사 후 갱신해야 한다.
        const studentCopy = cloneDeep(student);

        // 탐색을 수행하다가 콜백에서 true를 리턴하면 탐색을 중단하는 함수 사용
        studentCopy.some((v,i) => {
            if(v.id === id){
                // 복사된 배열에서 삭제버튼과 일치하는 id값을 갖는 항목을 삭제
                studentCopy.splice(i, 1);
                // 삭제된 결과를 상태값으로 갱신.
                setStudent(studentCopy);
                // 반복 중단을 위해서 true 리턴
                return true;
            }

            return false;
        });
    };

    return (
        <div>
            <h2>학생목록</h2>

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
                        <th>학생번호</th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>학년</th>
                        <th>학생코드</th>
                        <th>생일</th>
                        <th>전화번호</th>
                        <th>신장</th>
                        <th>몸무게</th>
                        <th>학과번호</th>
                        <th>담당교수번호</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {student.length > 0 ? (
                        student.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.userid}</td>
                                    <td>{item.grade}</td>
                                    <td>{item.idnum}</td>
                                    <td>{item.birthdate}</td>
                                    <td>{item.tel}</td>
                                    <td>{item.height}</td>
                                    <td>{item.weight}</td>
                                    <td>{item.deptno}</td>
                                    <td>{item.profno}</td>
                                    <td>
                                        <button type="button" data-id={item.id} onClick={onDeleteClick}>삭제하기</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan='9' align='center'>
                                검색결과가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Link to='/student_add'>학생추가</Link>
        </div>
    );
};

export default StudentList;
