# 15-covid19

## #01. 프로젝트 생성

```shell
yarn create react-app 15-covid19
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

### bootstrap을 사용할 경우

`index.js`에 다음의 구문 추가

```js
/** bs */
import 'bootstrap/dist/css/bootstrap.min.css';
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

#### /src/modules/index.js

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
import rootReducer from './modules';
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

## #03. 코로나19 OpenAPI

> http://itpaper.co.kr/demo/covid19/all.php

> http://itpaper.co.kr/demo/covid19/now.php

-----------------

## #04. 완성된 사이트 배포하기

### 1) 빌드하기

명령프롬프트로 프로젝트 폴더로 진입한 후 아래의 명령 수행.

```shell
yarn build
```

### 2) 결과물 확인하기

프로젝트 폴더 안에 `build`라는 이름의 디렉토리가 생성된다.

이 디렉토리 내의 결과물을 FTP 등으로 업로드하여 서비스할 수 있다.

### 3) 웹 사이트에서 특정 디렉토리 하위의 URL에서 서비스할 경우

#### package.json 수정

`package.json` 파일에 `"homepage": "/directory-name",` 구문을 추가한다.

```json
{
    "name": "15-covid19",
    "version": "0.1.0",
    "private": true,
    "homepage": "/directory-name",
    "dependencies": {
        ... 생략 ...
    }
}
```

#### `<Route>` 정의 update

추가한 속성값을 활용하기 위해 path 값 정의에서 `${process.env.PUBLIC_URL}`를 URL 앞에 명시한다.

> `${process.env.PUBLIC_URL}` 이 package.json에 명시한 `homepage`값을 의미

```
<Switch>
  <Route path={`${process.env.PUBLIC_URL}/`} component={Home} />
  <Route path={`${process.env.PUBLIC_URL}/news`} component={News} />
  <Route path={`${process.env.PUBLIC_URL}/about`} component={About}
  {/* … */}
</Switch>
```

#### `<Link>` 정의 update
```
<Link to={`${process.env.PUBLIC_URL}/page-path`}>…</Link>
```


