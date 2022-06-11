import React from 'react';

import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getList } from "../slices/NewsSlice";
import { Oval } from 'react-loader-spinner';

import Top from "../components/Top";
import NewsList from "../components/NewsList";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import style from "../assets/scss/style.module.scss";

const NewsPage = () => {

    let { category } = useParams();
    const {rt, rtmsg, item, loading} = useSelector((state) => state.news);
    const dispatch = useDispatch();

    React.useEffect(() =>{
        console.clear();
        dispatch(getList(category));
    }, [dispatch, category]);

    return (
        <div>
            <Top/>

            {loading && (
                <Oval
                    color = "#ff6600"
                    height = {100}
                    width={100}
                    wrapperStyle={{
                        position: "absolute",
                        left: "50%",
                        right: "50%",
                        marginLeft: "-50px",
                        marginTop: "-50px"
                    }}
                />
            )}

            {rt !== 200 ? (
                <div className={style.errmsg}>
                    <h3>{rt} Error</h3>
                    <p>{rtmsg}</p>
                </div>
            ) : (
                <NewsList articles={item.articles}/>
            )}
        </div>
    );
};

export default React.memo(NewsPage);