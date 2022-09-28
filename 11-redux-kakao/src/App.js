import React from 'react';
import styled from 'styled-components';
import { Route, NavLink, Routes } from 'react-router-dom';

//import ReduxToolkitCounter from "./pages/ReduxToolkitCounter";
//import ReduxToolkitDepartment from "./pages/ReduxToolkitDepartment";
//import ReduxToolkitProffessor from './pages/ReduxToolkitProffesor';
//import ReduxToolkitStudent from "./pages/ReduxToolkitStudent";
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

const App = () => {
  return (
    <div>
      <h1>React Toolkit</h1>

      <MenuLink to="/redux_toolkit_counter">NoReduxCounter</MenuLink>
      <MenuLink to="/redux_toolkit_department">UseReduxCounterDepartment</MenuLink>
      <MenuLink to="/redux_toolkit_professor">UseReduxCounterProffesor</MenuLink>
      <MenuLink to="/redux_toolkit_student">UseReduxCounterStudent</MenuLink>

      <hr />
      <Routes>
        
      </Routes>
    </div>
  );

}

export default App;