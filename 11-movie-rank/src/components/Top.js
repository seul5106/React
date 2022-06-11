import React from 'react';

import { useNavigate } from 'react-router-dom';

const Top = ({targetDt}) => {
    const navigate = useNavigate();

    const onDateChange = (e) => {
        e.preventDefault();
        navigate("/" + e.currentTarget.value);
    };
    
    return (
        <header>
            <h1>영화진흥위원회 박스오피스</h1>
            <hr/>
            <form>
                <input type="date" class="form-control" placeholder="날짜 선택" defaultValue={targetDt} onChange={onDateChange}/>
            </form>
            <hr/>
        </header>
    );
};

export default Top;