import React from 'react';

const MyPropsSub = (props) => {
    console.clear();
    console.group("MyPropsSub");
    console.dir(props);
    console.groupEnd();
    
    return (
        <div>
            <h3>MyPropsSub</h3>
            <p>
                제 이름은 <b>{props.name}</b>이고 <b>{props.age}</b>입니다.
            </p>
        </div>
    );
};

MyPropsSub.defaultProps = {
    name: "이름이 없습니다.",
    age: 20
}

export default MyPropsSub;