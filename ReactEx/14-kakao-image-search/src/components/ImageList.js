import React from 'react';

import ImageItem from './ImageItem';

const ImageList = ({documents}) => {
    return (
        <div className='row'>
            {documents.map( (item, index) => (
                <ImageItem item={item} />
            ) )}
        </div>
    );
};

// 검색 결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다.
ImageList.defaultProps = {
    documents: []
}

export default ImageList;