import React from 'react';

import MyNavLink from './MyNavLink';

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
                        <a className='navbar-brand' href={`${process.env.PUBLIC_URL}`}>
                            React 코로나19 상황판
                        </a>
                    </div>

                    {/* 메뉴 영역 */}
                    <div className='collapse navbar-collapse' id='navbar-collapse'>
                        {/* 메뉴 항목들 */}
                        <ul className="nav navbar-nav">
                        
                            <MyNavLink to={`${process.env.PUBLIC_URL}/korea_state`} exact={true} activeClassName='active'>국내 발생 현황</MyNavLink>
                            <MyNavLink to={`${process.env.PUBLIC_URL}/sido_state`} activeClassName='active'>시도별 발생 동향</MyNavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Top;
