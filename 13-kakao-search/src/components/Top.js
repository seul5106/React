import React from 'react';
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom';

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

  // HTML 태그에 접근할 수 있는 참조변수를 생성
  const inputQuery = React.useRef();

  // 검색어 상태변수 -> 기본값은 빈 문자열
  const [query, setQuery] = React.useState("");

  // 페이지 강제 이동 함수 생성
  const navigate = useNavigate();

  // 검색폼에 대한 이벤트 핸들러
  const handleSubmit = e => {
    e.preventDefault();

    // input태그의 입력값 가져오기
    const value = inputQuery.current.value;

    if (!value) {
      inputQuery.current.focus();
      alert("검색어를 입력하세요.");
      return;
    }

    // 입력된 검색어를 상태변수에 등록한다.
    setQuery(value);

    // 웹 검색 페이지로 강제 이동
    navigate(`/web?query=${encodeURIComponent(value)}`);
  }

  return (
    <div>
      <h1>카카오 검색</h1>
      <hr />
      {/* submit 이벤트 리스너에 미리 준비한 핸들러 연결 */}
      <form onSubmit={handleSubmit}>
        {/* 참조변수를 지정하여 입력요소에 접근할 수 있도록 처리 */}
        <input type="search" name="query" ref={inputQuery} />
        <button type="submit">검색</button>
      </form>
      <hr />

      {/* query값이 존재할 때만 메뉴를 노출한다. */}
      {query && (
        <nav>
          <MenuLink to={`/web?query=${encodeURIComponent(query)}`}>웹</MenuLink>
          <MenuLink to={`/image?query=${encodeURIComponent(query)}`}>이미지</MenuLink>
          <MenuLink to={`/blog?query=${encodeURIComponent(query)}`}>블로그</MenuLink>
          <MenuLink to={`/cafe?query=${encodeURIComponent(query)}`}>카페</MenuLink>
          <MenuLink to={`/book?query=${encodeURIComponent(query)}`}>책</MenuLink>
        </nav>
      )}
      <hr />
    </div>
  );
};

export default Top;