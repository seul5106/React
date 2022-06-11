import React from 'react';
import styled from 'styled-components'
import { NavLink} from 'react-router-dom';

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



const Top = () => {
    return (
        <div>
            <h1>Covid19 확진자 현황</h1>
            <hr/>
            <nav>
                <MenuLink to='/korea_state'>국내 발생 현황</MenuLink>
                <MenuLink to='/sido_state'>시도별 발생 현황</MenuLink>
            </nav>
        </div>
                
    );
};

export default Top;