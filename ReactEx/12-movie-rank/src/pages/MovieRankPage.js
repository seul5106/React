import React from 'react';
import PropTypes from 'prop-types';

// 'react-redux' 패키지에서 제공하는 hook 함수
import { useSelector, useDispatch } from 'react-redux';

// 모듈기능 참조
import * as movieRankReducer from '../reducers/MovieRankReducer';

// CSS 참조
import style from '../assets/css/style.module.css';

// 컴포넌트 참조
import Meta from '../components/Meta';
import Top from '../components/Top';
import MovieRankChart from '../components/MovieRankChart';
import MovieRankList from '../components/MovieRankList';

// 로딩컴포넌트
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const MovieRankPage = ({ match }) => {
    console.group('MovieRankPage');
    console.debug('targetDt >> ' + match.params.targetDt);
    console.groupEnd();

    /** Hook 기능을 통해 리덕스 상태값 가져오기 */
    const { result, loading, error } = useSelector((state) => {
        return {
            ...state.movieRankReducer,
        };
    });

    /** action함수를 dispatch 시키기 위한 기능 가져오기 */
    const dispatch = useDispatch();

    /** match 값이 변경될 때만 실행되는 hook 정의 */
    // 여기서 모듈에 정의해 놓은 thunk 함수를 dispatch하면 redux의 액션 함수가 실행되면서 상태값을 갱신하게 된다.
    React.useEffect(() => {
        const { targetDt } = match.params;
        dispatch(movieRankReducer.movieRankAsync(targetDt));
    }, [match]);

    return (
        <div className={style.containerTop}>
            {/* 검색날짜가 존재한다면 새로운 검색 페이지라는 의미 */}
            {match.params.targetDt && (
                <Meta
                    title={['BoxOffice(', match.params.targetDt, ')'].join('')}
                    description={['React.js로 구현한', match.params.targetDt, '의 영화 순위 검색 결과 입니다.'].join(' ')}
                    keywords={['React.js', '리액트', '영화순위', match.params.targetDt].join(',')}
                />
            )}

            <Top />

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
                    <div className='row'>
                        {/* 박스오피스 그래프 */}
                        <div className='col-xs-12'>
                            <MovieRankChart chartData={result.chartData} targetDt={match.params.targetDt} />
                        </div>
                        {/* 박스오피스 리스트 */}
                        <div className='col-xs-12'>
                            <MovieRankList boxOfficeResult={result.boxOfficeResult} />
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default React.memo(MovieRankPage);
