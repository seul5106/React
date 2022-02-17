import React from 'react';

import MyNavLink from './MyNavLink.js';

const Top = () => {
    return (
        <div>
            {/* bootstrap 메뉴바, 색상반전, 상단 고정 */}
            <nav className='navbar navbar-inverse navbar-fixed-top'>
                {/* 메뉴 안에서의 컨텐츠 영역 넓이 조정 */}
                <div className='container'>
                    {/* 로고 + 모바일 메뉴 버튼 */}
                    <div className='navbar-header'>
                        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar-collapse'>
                            <span className='sr-only'>Toggle navigation</span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                        </button>
                        <a className='navbar-brand' href='/'>헤드라인뉴스</a>
                    </div>

                    {/* 메뉴 영역 */}
                    <div className='collapse navbar-collapse' id='navbar-collapse'>
                        <ul className="nav navbar-nav">
                            <MyNavLink activeClassName="active" to="/">전체보기</MyNavLink>
                            <MyNavLink activeClassName="active" to="/business">비즈니스</MyNavLink>
                            <MyNavLink activeClassName="active" to="/entertainment">엔터테인먼트</MyNavLink>
                            <MyNavLink activeClassName="active" to="/health">건강</MyNavLink>
                            <MyNavLink activeClassName="active" to="/science">과학</MyNavLink>
                            <MyNavLink activeClassName="active" to="/sports">스포츠</MyNavLink>
                            <MyNavLink activeClassName="active" to="/technology">기술</MyNavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

// 페이지 이동 기능 사용하기 (2)
export default Top;
