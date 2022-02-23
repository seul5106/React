import React from 'react';

import styled from 'styled-components';
import { NavLink, Routes, Route } from "react-router-dom";

import MyState from './pages/MyState';
import DateRange1 from './pages/DateRange1';
import MyReducer from './pages/MyReducer';
import DateRange2 from './pages/DateRange2';
import MyEffect from './pages/MyEffect';
import MyRef from './pages/MyRef';
import MyCallback from './pages/MyCallback';
import MyMemo from './pages/MyMemo';
import MyWidth from './pages/MyWidth';

const MenuLink = styled(NavLink)`
  font-size:20px;
  cursor: pointer;
  text-decoration: none;
  padding-bottom: 2px;
  color: #222;

  /* CSS의 가상클래스 hover */
  &:hover{
    color: #22b8cf;
  }

  &:after {
    content: "|";
    display: inline-block;
    padding: 0 7px;
    color: #ccc;
  }

  &:last-child{
    &:after{
      /* 글자색을 흰색으로 지정하여 화면에서 숨긴다. */
      color: #fff;
    }
  }

  
  /*
  URL이 현재 메뉴를 가르키는 경우 (콜론이 아닌 점에 주의)
  활성 메뉴에 적용되는 기본 클래스 이름이 'active'이다. 다른 이름을 사용할 경우 컴포넌트에 activeClassName 속성으로 클래스 이름을 명시해야 한다.
  ex) &.activeLink --> <MenuLink activeClassName="activeLink" ...>
  */
  &.active {
    text-decoration: underline;
    color: #22b8cf;
    
    &.after{
      border-bottom: 4px solid #fff !important;
    }

  }
`;

function App() {
  return (
    <div>
      <h1>06-hook-event</h1>
      <nav>
        <MenuLink to='/mystate'>MyState</MenuLink>
        <MenuLink to='/daterange1'>DateRange1</MenuLink>
        <MenuLink to='/myeffect'>MyEffect</MenuLink>
        <MenuLink to='/myref'>MyRef</MenuLink>
        <MenuLink to='/myreducer'>MyReducer</MenuLink>
        <MenuLink to='/daterange2'>DateRange2</MenuLink>
        <MenuLink to='/mymemo'>MyMemo</MenuLink>
        <MenuLink to='/mycallback'>MyCallback</MenuLink>
        <MenuLink to='/mywidth'>MyWidth</MenuLink>
      </nav>
      <hr />

      <Routes>
        <Route path='/' element={<MyState />} />
        <Route path='/mystate' element={<MyState />} />
        <Route path='/daterange1' element={<DateRange1 />} />
        <Route path='/myeffect' element={<MyEffect />} />
        <Route path='/myref' element={<MyRef />} />
        <Route path='/myreducer' element={<MyReducer />} />
        <Route path='/daterange2' element={<DateRange2 />} />
        <Route path='/mycallback' element={<MyCallback />} />
        <Route path='/mymemo' element={<MyMemo />} />
        <Route path='/mywidth' element={<MyWidth />} />
      </Routes>
    </div>
  );
}

export default App;
