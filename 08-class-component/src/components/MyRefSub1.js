import React from "react";

class MyRefSub1 extends React.Component {
    // React.createRef() 함수를 통해 참조변수를 생성
    // 함수형 컴포넌트에서는 React.useRef() 함수를 사용했었다.
    // 이렇게 생성된 참조변수는 render() 함수 안에서 this를 통해 접근할 수 있다.
   

    render() {
        return (
            <div>
                <h3>MyRefSub1</h3>

                {/* 미리 준비한 컴포넌트 참조변수와 HTML 태그를 연결 */}
               
            </div>
        );
    }
}

export default MyRefSub1;
