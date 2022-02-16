import React from "react";
import Meta from '../component/Meta';

/**
 * /about 페이지를 구성하는 컴포넌트
 */
const About = () => {
    return (
        <div>
            {/* Route처리를 적용받는 페이지에서 이 컴포넌트를 중복 사용시 App.js에서의 설정을 덮어쓰게 된다. */}
            <Meta title="About.js" description="여기는 About.js파일 입니다." keyword="React, About" url={window.location.href}/>
            <h2>여기는 About.js 입니다.</h2>
        </div>
    );
};

export default About;
