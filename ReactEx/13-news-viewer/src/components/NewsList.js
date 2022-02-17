import React from 'react';

import moment from 'moment';

const NewsList = ({articles}) => {
    console.group("NewsList");
    console.group(articles);
    console.groupEnd();

    return (
        <div>
            <div className="page-header">
                <h2>헤드라인 뉴스</h2>
            </div>
            <ul className="media-list">
                {articles.map((item, index) => (
                    <li className="media" key={index} style={{marginBottom: "25px", paddingBottom: "25px", borderBottom: "1px solid #eee"}}>
                        {item.urlToImage && (
                            <div className="media-left">
                                <a href={item.url} target="_blank" style={{
                                    display: 'block',
                                    width: '200px',
                                    height: '150px',
                                    border: '1px solid #eee',
                                    background: 'url(' + item.urlToImage + ') no-repeat center center',
                                    backgroundSize: 'cover'
                                }}>
                                </a>
                            </div>
                        )}
                        <div className="media-body">
                            <h4 className="media-heading">
                                <a href={item.url} target="_blank">{item.title}</a>
                            </h4>
                            <p>{item.description}</p>
                            <p className='text-right'>
                                {item.source && (
                                    <span>{item.source.name}</span>
                                )}
                                {item.publishedAt && (
                                    <span style={{marginLeft: "10px"}}>{moment(item.publishedAt).format('YY/MM/DD hh:mm')}</span>
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 검색 결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다.
NewsList.defaultProps = {
    articles: []
}

export default NewsList;