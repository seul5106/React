import App from 'next/app';

// import한 컴포넌트들이 저장되는 객체이름은 대문자로 시작해야 함
import Header from '../components/Header';
import Footer from '../components/Footer'; 

/**
 * 모든 페이지들에게 적용되는 공통 컴포넌트 (헤더,푸터를 구현하는 용도)
 * 클래스 형태로 작성해야 함
 * -> 페이지들의 내용이 이 안에 포함되는 개념
 */
class MyApp extends App {
    /** 고정코드 */
    static async getInitialProps(appContext) {
        // 브라우저가 URL로 접근했을 때,
        // index.js, introduce.js와 같은 일반 페이지 스크립트들을 appContext로 받는다. 
        // 이를 리턴하여 렌더링 함수로 전달해야 한다.
        const appProps = await App.getInitialProps(appContext);
        return { ...appProps };
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <div>
                <Header />
                {/* 일반 페이지 컴포넌트를 출력한다. --> index.js, introduce.js */}
                <Component {...pageProps} />
                <Footer />
            </div>
        );
    }
}

export default MyApp;
