import React from 'react';

import style from "../assets/scss/style.module.scss";

const SidoStateTable = ({ state }) => {
    return (
        <div>
            <h2 className={style.title}>시도별 발생 동향</h2>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th rowSpan="2">시도명</th>
                        <th rowSpan="2">전일대비<br />확진환자 증감</th>
                        <th colSpan="4">확진환자 (명)</th>
                    </tr>
                    <tr>
                        <th>확진환자</th>
                        <th>격리중</th>
                        <th>격리해제</th>
                        <th>사망자</th>
                    </tr>
                </thead>
                <tbody>
                    {state && state.map((item, index) => (
                        <tr key={index}>
                            <th>{item.region}</th>
                            <td>{Number(item.confirmed - item.confirmed_prev).toLocaleString()}명</td>
                            <td>{Number(item.confirmed).toLocaleString()}명</td>
                            <td>{Number(item.active).toLocaleString()}명</td>
                            <td>{Number(item.released).toLocaleString()}명</td>
                            <td>{Number(item.death).toLocaleString()}명</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

SidoStateTable.defaultProps = {
    state: []
}

export default SidoStateTable;