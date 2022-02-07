import React from 'react';

import MySubComponent from './MySubComponent';

function MyComponent2() {
    return (
        <div>
            <h2>Virtual DOM</h2>
            <p>This is React Component</p>
            
            <MySubComponent />
            <MySubComponent />
            <MySubComponent />
            <MySubComponent />
        </div>
    );
}

export default MyComponent2;