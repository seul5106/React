// 링크를 적용하기 위해 import 필요함 (nextjs 전용)
import Link from 'next/link';

// 함수 이름은 URL에 영향을 주지 않는다. 오직 파일 이름으로만 URL이 결정된다.
const Home = (props) => {
    return (
        <div className='container'>
            <div className='page-header'>
                <h1>Hello Next.js</h1>
            </div>

            {/* 백엔드를 통한 신규 접속 --> Node.js 구동 */}
            <a href='/' className='btn btn-primary'>
                Go Home
            </a>
            
            &nbsp;

            {/* 브라우저에 저장된 스크립트를 통한 페이지 렌더링 --> 리액트 구동 */}
            <Link href='/'>
                <a className='btn btn-success'>홈으로 이동</a>
            </Link>

            <hr />

            <h2>이 페이지는 <storng className="text-success">{props.from}</storng>에서 실행되었습니다.</h2>
            <h3>a={props.a}</h3>
            <h3>b={props.b}</h3>
        </div>
    );
};

// 모든 pages폴더 내의 함수들은 getInitialProps 라는 하위 함수를 갖는다.
// 이 함수를 통해 각 페이지가 웹 프로그램으로 동작할 수 있는 기능을 넘겨받는다.
// ex) 브라우저의 요청을 받기 위한 request 객체 등...
Home.getInitialProps = async (props) => {
    console.log(props);

    let from = 'client';

    // 브라우저에 URL을 직접 입력하거나 <a>태그에 의해서 이동된 경우만 req값이 존재한다.
    if (props.req) {
        from = 'server';

        // req객체의 사용 방법은 node.js 참고.
        console.log(props.req);
    }

    // 이 함수에서 return하는 객체는 컴포넌트함수에 props 파라미터로 전달된다.
    return { a: 123, b: 234, from: from };
};

export default Home;
