# 13-redux-news-viewer

## #01. 프로젝트 생성

```shell
yarn create react-app 13-redux-news-viewer
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
yarn add chart.js                     # (여기서는 사용 안함)
yarn add react-chartjs-2              # (여기서는 사용 안함)
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


## #03. 뉴스 Open API 키 발급받기

> https://newsapi.org/

