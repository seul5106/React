import React from 'react';
import moment from 'moment';
/**
 * useState를 사용하여 날짜 범위 선택 기능 구현
 */
const DateRange1 = () => {

    const [myDate, setMyDate] = React.useState({
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
    })

    return (
        <div>
            <h2>DateRange1</h2>

            <p>
                {myDate.startDate} ~ {myDate.endDate}
            </p>

            <p>
                <button
                    type='button'
                    onClick={(e) => { //onClick은 html태그일때만 사용가능(커스텀 컴포넌트 안됨!!)
                        // 날짜 계산 참고: https://momentjs.com/docs/#/manipulating/add/
                        setMyDate({ ...myDate, startDate: moment().add(-7, 'd').format('YYYY-MM-DD') });
                    }}>
                    7일
                </button>

                <button
                    type='button'
                    onClick={(e) => {
                        setMyDate({ ...myDate, startDate: moment().add(-15, 'd').format('YYYY-MM-DD') });
                    }}>
                    15일
                </button>

                <button
                    type='button'
                    onClick={(e) => {
                        setMyDate({ ...myDate, startDate: moment().add(-1, 'M').format('YYYY-MM-DD') });
                    }}>
                    1개월
                </button>

                <button
                    type='button'
                    onClick={(e) => {
                        setMyDate({ ...myDate, startDate: moment().add(-3, 'M').format('YYYY-MM-DD') });
                    }}>
                    3개월
                </button>

                <button
                    type='button'
                    onClick={(e) => {
                        setMyDate({ ...myDate, startDate: moment().add(-6, 'M').format('YYYY-MM-DD') });
                    }}>
                    6개월
                </button>
            </p>

        </div>
    );
};

export default DateRange1;
