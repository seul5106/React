import React from 'react';

import { Helmet } from 'react-helmet';

import covid19 from '../assets/img/covid19.jpg';

const Meta = (props) => {
    return (
        <Helmet>
            <meta charSet='utf-8' />
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

            {/* 추가적으로 적용해야할 외부 js나 css를 여기서 명시할 수 있다. */}
            <script src="//code.jquery.com/jquery.min.js"></script>
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </Helmet>
    );
};

Meta.defaultProps = {
    title: '리액트 코로나19 상황판',
    description: 'React.js로 구현한 코로나19 상황판',
    keywords: 'React,코로나19,Covid19',
    author: '호쌤',
    image: covid19,
    url: window.location.href
}

export default Meta;
