import React from 'react';

import { Link, Routes, Route } from "react-router-dom";
import MainSub1 from './MainSub1';
import MainSub2 from './MainSub2';

const Main = () => {
    return (
        <div>
            <h2>여기는 Main.js 파일 입니다.</h2>
            <p>SubRoute에 대한 경로 구성은 "./"없이 상대경로만 가능 합니다. (절대경로 불가)</p>
            <nav>
                <Link to="sub1">Goto Sub1</Link>
                <Link to="sub2">Goto Sub2</Link>
            </nav>

            <Routes>
                {/* 부모와 같은 URL을 적용받는 Sub Route는 기본값으로 실행된다. */}
                <Route path="sub1" element={<MainSub1/>} />
                <Route path="sub2" element={<MainSub2/>} />
            </Routes>
        </div>
    );
};

export default Main;
