import React from 'react';

import MyPropTypesSub from '../components/MyPropTypesSub';

const MyPropTypes = () => {
    return (
        <div>
            <h2>MyPropTypes</h2>
            <MyPropTypesSub name='민호' age={19} hobby="사진찍기" />
            <MyPropTypesSub name='수영' age='스물한살' hobby="영화보기" />
            <MyPropTypesSub name='철민' age={22} />
        </div>
    );
};

export default MyPropTypes;
