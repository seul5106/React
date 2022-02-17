# 12-movie-rank

## #01. 프로젝트 생성

```shell
yarn create react-app 12-movie-rank
```

### 1) 추가 패키지 설치

프로젝트를 VSCode로 열고, `Ctrl` + `~`를 눌러 터미널 실행

```shell
yarn add react-router-dom
yarn add qs
yarn add node-sass
yarn add styled-components
yarn add axios
yarn add react-helmet
yarn add react-bootstrap
yarn add bootstrap@3
yarn add moment
yarn add redux 
yarn add react-redux 
yarn add redux-actions 
yarn add redux-devtools-extension 
yarn add redux-logger 
yarn add redux-thunk
yarn add chart.js
yarn add react-chartjs-2
yarn add react-loader-spinner
```

### 2) 프로젝트 생성 후 기초작업

1. **src폴더** 하위에서 App.css와 index.css, logo.svg 삭제
1. **App.js** 파일에서 App.css와 logo.svg에 대한 참조(import) 구문 제거
1. **index.js** 파일에서 index.css에 대한 참조(import) 구문 제거
1. index.js 파일에서 다음의 구문 추가
    ```js
    import { BrowserRouter } from 'react-router-dom';
    ```
1. index.js 파일에서 `<App />`을 `<BrowserRouter><App /></BrowserRouter>`로 변경
1. App.js 파일에 다음을 추가
   ```js
   import { Route, NavLink, Switch } from "react-router-dom";
   ```
   혹은
   ```js
   import { Route, Link, Switch } from "react-router-dom";
   ```

## 3) 프로젝트 실행

프로젝트를 VSCode로 열고, `Ctrl` + `~`를 눌러 터미널 실행

```shell
yarn start
```

---------------

## #02. 리덕스 스토어 구성하기

> 앞 단원에서 정리한 내용을 간략하게 정리한 형태 입니다. (내용은 동일)

### 1) 기능별 모듈(Reducer)을 결합할 준비

#### /src/reducers/index.js

폴더와 파일을 직접 생성한다.

```js
import { combineReducers } from 'redux';

export default combineReducers({
    // 앞으로 추가될 모듈들이 이 위치에서 리덕스에 추가된다.
});
```

### 2) 리덕스 스토어 구성하기

### /src/index.js

#### 1) 리덕스를 위한 참조 추가

```js
/** 리덕스를 위한 참조 추가 */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';
```

#### 2) 리덕스 스토어 생성
```js
/** 리덕스 스토어 생성 */
const logger = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk)));
```

#### 3) 렌더링 처리

렌더링 처리를 `<Provider store={store}>` 태그로 감싼다.
```js
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
```


---------------------

## #03. 영화진흥위원회 Open API

> http://www.kobis.or.kr/kobisopenapi/

영화 박스 오피스 데이터를 조회할 수 있다.

사이트 회원 가입, 로그인 후 **키 발급받기** 메뉴를 통해 연동키를 발급받은 후 사용한다.

### 일별 박스 오피스 API

`OPEN API > 제공 서비스` 메뉴를 통해 **일별 박스오피스 API 서비스** API 스팩 확인

> http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do


#### 요청 주소

> http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json

#### 요청 변수

| 변수명   | 데이터 타입  | 설명                                            |
| -------- | ------------ | -------------------------------------------- |
| key      | 문자열(필수) | 발급받은키 값을 입력합니다.                        |
| targetDt | 문자열(필수) | 조회하고자 하는 날짜를 yyyymmdd 형식으로 입력합니다. |