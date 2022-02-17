import React from 'react';
import { Route, NavLink, Routes } from 'react-router-dom';

import InlineCss from './pages/InlineCss';
import CssClass from './pages/CssClass';
import CssModule from './pages/CssModule';
import Scss from './pages/Scss';
import ScssModule from './pages/ScssModule';
import StyledComponent from './pages/StyledComponent';

// CSS파일도 import해야한다.
import './assets/css/menu.css';

const App = () => {
    // 페이지 타이틀에 적용할 InlineCSS 정의
    // --> CSS는 JS 속성으로 기술해야 함.  margin-right 쓰면안됨
    // --> 전체 구조는 JSON객체. 스타일시트를 직접 넣을경우 괄호가 이중으로 들어감 {{}}
    const myStyle = { fontWeight: 'bold', color: '#b82514', textDecoration: 'none', marginRight: "10px" };

    return (
        <div>
            <h1>04-stylesheet</h1>

            <nav>
                {/* NavLink 구성
                - 기본 Link컴포넌트의 기능에 classNmae, activeClassName 속성이 추가된 객체
                - className : 기본적으로 적용될 CSS 클래스 이름
                - 현재 브라우저가 위치하는 URL과 동일한 주소를 갖는 링크에게 active 클래스가 자동으로 적용된다.
                  active 클래스에 대한 style의 존재 유무와는 별개임
                */}
                

                {/* <NavLink activeStyle={myStyle} to='/inline_css'>InlineCss</NavLink>
                <NavLink activeStyle={myStyle} to='/css_class'>CssClass</NavLink>
                <NavLink activeStyle={myStyle} to='/css_module'>CssModule</NavLink>
                <NavLink activeStyle={myStyle} to='/scss'>Scss</NavLink>
                <NavLink activeStyle={myStyle} to='/scss_module'>ScssModule</NavLink>
                <NavLink activeStyle={myStyle} to='/styled_component'>StyledComponent</NavLink> */}

                {/* 현재 URL과 동일한 링크에는 active 클래스가 자동으로 적용된다. */}
                <NavLink className="normalLink" to='/inline_css'>InlineCss</NavLink>
                <NavLink className="normalLink" to='/css_class'>CssClass</NavLink>
                <NavLink className="normalLink" to='/css_module'>CssModule</NavLink>
                <NavLink className="normalLink" to='/scss'>Scss</NavLink>
                <NavLink className="normalLink" to='/scss_module'>ScssModule</NavLink>
                <NavLink className="normalLink" to='/styled_component'>StyledComponent</NavLink>
            </nav>
            <hr />

            <Routes>
                <Route path="/inline_css" component={InlineCss} />
                <Route path="/css_class" component={CssClass} />
                <Route path="/css_module" component={CssModule} />
                <Route path="/scss" component={Scss} />
                <Route path="/scss_module" component={ScssModule} />
                <Route path="/styled_component" component={StyledComponent} />
            </Routes>
        </div>
    );
};

export default App;
