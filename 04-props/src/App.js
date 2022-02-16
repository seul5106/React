import React from 'react';
import { Link, Routes, Route } from "react-router-dom";

import MyProps from './pages/MyProps';
import MyPropTypes from './pages/MyPropTypes';
import MyChildren from './pages/MyChildren';

function App() {
  return (
    <div>
     <h1>05-props</h1>
            <nav>
                <Link to="/myprops">[MyProps]</Link>
                <Link to="/myproptypes">[MyPropTypes]</Link>
                <Link to="/mychildren">[MyChildren]</Link>
            </nav>
            <hr />
            {/* Route 처리할 컴포넌트 정의 */}
            <Routes>
                <Route path="/myprops" element={<MyProps/>} />
                <Route path="/myproptypes" element={<MyPropTypes/>} />
                <Route path="/mychildren" element={<MyChildren/>} />
            </Routes>
    </div>
  );
}

export default App;
