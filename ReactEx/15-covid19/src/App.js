import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import Meta from './components/Meta';
import Top from './components/Top';
import KoreaStatePage from './pages/KoreaStatePage';
import SidoStatePage from './pages/SidoStatePage';

import style from './assets/css/style.module.css';

const App = () => {
    return (
        <div className={style.containerTop}>
            <Meta />
            <Top />

            <Switch>
                <Route path={[`${process.env.PUBLIC_URL}/`, `${process.env.PUBLIC_URL}/korea_state`]} component={KoreaStatePage} exact={true} />
                <Route path={`${process.env.PUBLIC_URL}/sido_state`} component={SidoStatePage} />
            </Switch>

            <div className={style.footer}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p>copyright&copy;itpaper.co.kr</p>
                            <p>이젠아카데미컴퓨터학원</p>
                        </div>
                        <div className="col-md-6">
                            <div className='text-right'>
                                <p>이 웹 사이트는 이젠컴퓨터아카데미 수업 예제로 활용되고자 구축되었습니다.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
