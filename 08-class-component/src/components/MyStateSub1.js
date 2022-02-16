import React from 'react';

/**
 * props : 컴포넌트를 사용하는 부모에 의해 전달받는 변수
 *         컴포넌트 내부에서 변경할 수 없다.
 * state : 컴포넌트 내부에서 자체적으로 사용하는 변수.
 */
class MyStateSub1 extends React.Component {
    /**
     * 생성자 정의 - 생성자는 props값을 파라미터로 반드시 지정해야 한다.
     */
    

    render() {
        return (
            <div>
                <h3>MyStateSub1</h3>

               
            </div>
        );
    }
}

export default MyStateSub1;