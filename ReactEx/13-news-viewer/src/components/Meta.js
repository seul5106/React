import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * <head>태그에 포함될 내용들을 정의하는 컴포넌트
 * 06-bootstrap/src/components/Meta.js 파일의 내용과 동일하다.
 */
const Meta = (props) => {
    return (
        <Helmet>
            <meta charset='utf-8' />
            <title>{props.title}</title>
            {/* SEO 태그 */}
            <meta name='description' content={props.description} />
            <meta name='keywords' content={props.keywords} />
            <meta name='author' content={props.author} />
            <meta property='og:type' content='website' />
            <meta property='og:title' content={props.title} />
            <meta property='og:description' content={props.description} />
            <meta property='og:image' content={props.image} />
            <meta property='og:url' content={props.url} />

            {/* 추가적으로 적용해야할 외부 js나 css로 여기서 명시할 수 있다. */}
            {/* 여기서의 jquery는 bootstrap이 의존하기 때문에 참조하는 것으로 이 예제에서 직접적으로 사용하지는 않는다. */}
            <script src="//code.jquery.com/jquery.min.js"></script>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </Helmet>
    );
};

Meta.defaultProps = {
    title: '헤드라인 뉴스',
    description: 'React.js로 구현한 헤드라인 뉴스',
    keywords: 'React,헤드라인,뉴스기사',
    author: '호쌤',
    image: window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/logo512.png',
    url: window.location.href
}

export default Meta;
