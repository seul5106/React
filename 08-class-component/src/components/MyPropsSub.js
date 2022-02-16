import React from 'react';

class MyPropsSub extends React.Component {
   

    /** 화면에 렌러링할 JSX 내용을 리턴하는 함수 */
    render() {
        // Component 클래스는 props라는 멤버변수를 내장한다.
        // "this.props.사용자지정변수" 형식으로 값에 접근할 수 있다.
      

        return (
            <div>
                <h3>MyPropsSub</h3>
               
            </div>
        );
    }
}

// 함수형 컴포넌트 방식과 동일하게 클래스 외부에서 정의하는 것도 가능함.
// MyPropsSub.defaultProps = {
//     name: '이름없음',
//     age: 20
// }

export default MyPropsSub;
