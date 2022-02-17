import React from 'react';

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from 'react-redux';

// 모듈기능 참조
import * as newsReducer from '../reducers/NewsReducer';

// CSS 참조
import style from '../assets/css/style.module.css';

// 컴포넌트 참조
import Meta from '../components/Meta';
import Top from '../components/Top';
import NewsList from '../components/NewsList';

// 로딩컴포넌트
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const NewsListPage = ({ match }) => {
    console.group('NewsListPage');
    console.debug('category >> ' + match.params.category);
    console.groupEnd();

    /** Hook 기능을 통해 리덕스 상태값 가져오기 */
    const { result, loading, error } = useSelector((state) => {
        return {
            ...state.newsReducer,
        };
    });

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    /** match 값이 변경될 때만 실행되는 hook 정의 */
    // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
    React.useEffect(() => {
        const { category } = match.params;
        dispatch(newsReducer.newsAsync(category));
    }, [match]);

    return (
        <div className={style.containerTop}>
            {/* 카테고리가 존재한다면 새로운 검색 페이지라는 의미 */}
            {match.params.category && (
                <Meta
                    title={['헤드라인 뉴스(', match.params.category, ')'].join('')}
                    description={['React.js로 구현한', match.params.category, '의 헤드라인 입니다.'].join(' ')}
                    keywords={['React.js', '리액트', '헤드라인뉴스', match.params.targetDt].join(',')}
                />
            )}

            {loading ? (
                <Loader
                    type='Bars'
                    color='#00BFFF'
                    height={100}
                    width={100}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        marginLeft: '-50px',
                        marginTop: '-50px',
                    }}
                />
            ) : (
                result && (
                    <NewsList articles={result.articles}/>
                )
            )}
        </div>
    );
};

export default React.memo(NewsListPage);
