import React from 'react';

// 페이지 이동 기능 사용하기 (1) --> withRouter 참조
import { withRouter } from 'react-router-dom';

// 페이지 이동 기능 사용하기 (3) --> props에 포함되는 history와 match객체 사용 가능.
const Top = ({history, match}) => {

    /** 검색 폼에 대한 submit 이벤트 핸들러 */
    const onQuerySubmit = (e) => {
        // <form>의 submit이 발생했을 때 페이지 이동 처리 방지
        e.preventDefault();

        // <form>요소 추출하기
        // --> 일반 javascript에서 `document.폼이름`으로 처리하는 것과 동일
        const form = e.currentTarget;

        // 검색어 가져오기
        const query = form.query.value;

        // route 모듈의 페이지 이동 기능 활용
        // 이 컴포넌트가 <Route>에 의해 호출되는 형태가 아니므로 `withRouter`를 통해서만 history를 받을 수 있다.
        history.push("/" + query);
    };

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
                        <a className='navbar-brand' href='/'>이미지검색</a>
                    </div>

                    {/* 메뉴 영역 */}
                    <div className='collapse navbar-collapse' id='navbar-collapse'>
                        {/* 우측 폼 영역 */}
                        <form className='navbar-form navbar-right' onSubmit={onQuerySubmit}>
                            <div className='form-group'>
                                <div className='input-group'>
                                    <input type='sarch' name='query' className='form-control' placeholder='검색어...' defaultValue={match.params.query} />
                                    <span className='input-group-btn'>
                                        <button type='submit' className='btn btn-primary'>검색</button>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

// 페이지 이동 기능 사용하기 (2)
export default withRouter(Top);
