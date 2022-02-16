import React from 'react';

import MyPropsSub from '../components/MyPropsSub';

const MyProps = () => {
    return (
        <div>
            <h2>MyProps</h2>

            <MyPropsSub/>
            <MyPropsSub name="민호" age="20"/>
            <MyPropsSub name="수영" age="21"/>
        </div>
    );
};

export default MyProps;