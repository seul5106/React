import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import qs from "qs"

import Meta from "./components/Meta"
import Top from "./components/Top"

import BookPage from "./pages/BookPage";

import style from "./assets/scss/style.module.scss";

const App = () => {

  // Top.js에서 클릭된 링크에 의해 전달되는 QueryString을 추출한다.
  const { search } = useLocation();

  // 추출된 QueryString을 JSON객체로 파싱하고 Key가 query인 값만 추출한다.
  const { query } = qs.parse(search, { ignoreQueryPrefix: true });

  // 추출된 QueryString을 JSON객체로 파싱하고 Key가 sorting인 값만 추출한다.
  const { sorting } = qs.parse(search, { ignoreQueryPrefix: true });

  console.log(search)
  return (
    <div className={style.container}>
      <Meta />
      <Top />
      <Routes>
        <Route path="/book" element={<BookPage query={query} sorting={sorting}/>} />
      </Routes>
    </div>
  );
}

export default App;