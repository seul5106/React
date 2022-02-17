import React from 'react';

import style from '../assets/css/style.module.css';

const SidoStateTable = ({state}) => {
    return (
        <div className={'table-responsive ' + style.mt30}>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr className="success">
                        <th className="text-center" rowspan="2">시도명</th>
                        <th className="text-center" rowspan="2">전일대비<br/>확진환자 증감</th>
                        <th className="text-center" colspan="4">확진환자 (명)</th>
                    </tr>
                    <tr className="success">
                        <th className="text-center">확진환자</th>
                        <th className="text-center">격리중</th>
                        <th className="text-center">격리해제</th>
                        <th className="text-center">사망자</th>
                    </tr>
                </thead>
                <tbody>
                    {state && state.map((item, index) => (
                        <tr key={index}>
                            <th className='text-center'>{item.region}</th>
                            <td className='text-center'>{Number(item.confirmed-item.confirmed_prev).toLocaleString()}명</td>
                            <td className='text-center'>{Number(item.confirmed).toLocaleString()}명</td>
                            <td className='text-center'>{Number(item.active).toLocaleString()}명</td>
                            <td className='text-center'>{Number(item.released).toLocaleString()}명</td>
                            <td className='text-center'>{Number(item.death).toLocaleString()}명</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// 컴포넌트는 항상 자신의 props에 원하는 key가 포함되지 않을 경우에 대비하는 것이 좋다.
SidoStateTable.defaultProps = {
    state: []
};

export default SidoStateTable;