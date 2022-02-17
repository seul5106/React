import React from "react";

import moment from 'moment';

import styled, { css } from 'styled-components';

/** 이미지를 표시할 <a> 요소에 대한 스타일 정의하기 */
const ThumbnailLink = styled.a`
    display: block;
    width: auto;
    height: 240px;
    background-size: cover;
    background-postion: center center;
    margin-bottom: 15px
`;

const ImageItem = ({ item }) => {
    return (
        <div className="col-md-3 col-sm-6">
            <div className="thumbnail">
                <ThumbnailLink href={item.image_url} target="_blank" style={{
                    backgroundImage: 'url("' + item.thumbnail_url + '")'
                }} />
                <h4>
                    <a href={item.doc_url} target="_blank">
                        {item.display_sitename}
                    </a>
                </h4>
                <p>
                    <span className="label label-primary">
                        {item.collection}
                    </span>
                    &nbsp;
                    {item.width}x{item.height}
                </p>
                <p className="text-right">
                    {moment(item.datetime).format("YY/MM/DD hh:mm")}
                </p>
            </div>
        </div>
    );
};

export default ImageItem;
