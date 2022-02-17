// 파라미터를 받기 위한 패키지 참조
import { useRouter } from 'next/router';

/**
 * [Path 파라미터 받기]
 *
 * URL이 "/portfolio/변수명" 인 경우
 * 1) /portfolio 이라는 이름의 폴더를 생성
 * 2) /portfolio/[변수명].js 로 소스파일을 작성
 *
 * 주의!!! --> /portfolio이라는 이름의 폴더와 /portfolio.js 라는 파일이 함께 존재하면 route는 동작하지 않음. (파일이 우선순위)
 */

const Portfolio = () => {
    // hook을 통해 라우터 사용 시작
    const router = useRouter();

    console.log(router.query);

    return (
        <div className='container'>
            <div className='page-header'>
                <h1>포트폴리오</h1>
            </div>
            <pre> {JSON.stringify(router.query)} </pre>

            <hr />

            {
                (router.query.name === 'web') ? (
                    <div>웹 사이트 포트폴리오</div>
                ) : ((router.query.name === 'mobile') ? (
                    <div>모바일 웹 포트폴리오</div>
                ) : (
                    <div>스마트폰 앱 포트폴리오</div>
                ))}
        </div>
    );
};

export default Portfolio;
