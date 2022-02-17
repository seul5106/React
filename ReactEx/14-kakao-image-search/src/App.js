import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Meta from './components/Meta';
import Top from "./components/Top";
import ImageSearchPage from './pages/ImageSearchPage';

const App = () => {
    return (
        <div className='container'>
            <Meta />

            {/* 메뉴바 */}
            <Top />

            <Switch>
                {/* Path 파라미터로 카테고리 값을 받는 페이지 구성 */}
                {/* ":변수이름?" 에서 물음표는 해당 변수가 선택적이라는 의미 */}
                <Route path='/:query?' component={ImageSearchPage} />
            </Switch>
        </div>
    );
};

export default App;
