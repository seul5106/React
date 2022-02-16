import React from 'react';

// 컴포넌트 props의 필수 여부를 지정하거나 props의 DataType을 지정할 때 사용
// -> https://reactjs-kr.firebaseapp.com/docs/typechecking-with-proptypes.html
import PropTypes from 'prop-types';

class MyPropTypesSub extends React.Component {
    /** 이 컴포넌트로 전달되는 props 값들에 대한 형식과 필수 여부 지정 */
    // 규칙에 맞지 않는 props값에 대해 브라우저 개발자 콘솔에 Warning 메시지가 출력된다.
   

    /** 화면에 렌러링할 JSX 내용을 리턴하는 함수 */
    render() {
        // 비구조 문법을 통해 변수 속성값을 변수로 선언할 경우 render 함수 내부에서 처리한다.
       

        return (
            <div>
                <h3>MyPropTypesSub</h3>
               
            </div>
        );
    }
}

// 함수형 컴포넌트 방식과 동일하게 클래스 외부에서 정의하는 것도 가능함.
// MyPropTypesSub.propTypes = {
//     name: PropTypes.string,
//     age: PropTypes.number,
//     hobby: PropTypes.string.isRequired
// };

export default MyPropTypesSub;