import React from 'react';

/**
 * JSX 조건분기 (1) - 함수를 통한 리턴값 분기
 */
const If1 = () => {
    const btnLogin = (isLogin) => {
        if(isLogin === true) {
            return <button type="button">Logout</button>
        }else{
            return <button type="button">Login</button>
        }
    }
    return (
        <div>
             <h2>If1</h2>
            {btnLogin(false)}
        </div>
    );
};

export default If1;