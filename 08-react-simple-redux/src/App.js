import React from 'react';
import styled from 'styled-components';
import { Route, NavLink, Routes } from 'react-router-dom';

import NoReduxCounter from './pages/NoReduxCounter';
import UseReduxCounter from './pages/UseReduxCounter';
import UseReduxHookCounter from './pages/UseReduxHookCounter';

/** 메뉴링크 --> 07-hook-event 예제의 App.js 파일의 내용과 동일 */
const MenuLink = styled(NavLink)`
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    padding-bottom: 2px;
    color: #222;

    &:hover {
        color: #22b8cf;
    }

    &:after {
        content: '|';
        display: inline-block;
        padding: 0 7px;
        color: #ccc;
    }

    &:last-child {
        &:after {
            color: #fff;
        }
    }

    &.active {
        text-decoration: underline;
        color: #22b8cf;
        &:after {
            border-bottom: 4px solid #fff !important;
        }
    }
`;

/** 클래스 기반의 컴포넌트 */
// 항상 'React.Component'를 상속받아야 한다.
// 초기화 단축키 : rcc
class App extends React.Component {
    /**
     * 화면에 렌러링할 JSX 내용을 리턴하는 함수
     * --> 클래스형 컴포넌트는 render() 메서드를 반드시 포함해야 한다.
     */
    render() {
        return (
            <div>
                <h1>React Redux Counter</h1>

                <MenuLink to="/no_redux_counter">NoReduxCounter</MenuLink>
                <MenuLink to="/use_redux_counter">UseReduxCounter</MenuLink>
                <MenuLink to="/use_redux_hook_counter">UseReduxHookCounter</MenuLink>

                <Routes>
                    <Route path='/' element={<NoReduxCounter />} />
                    <Route path='/no_redux_counter' element={<NoReduxCounter />} />
                    <Route path='/use_redux_counter' element={<UseReduxCounter />} />
                    <Route path='/use_redux_hook_counter' element={<UseReduxHookCounter />} />
                </Routes>
            </div>
        );
    }
}

export default App;