import React from 'react';
import moment from 'moment';

// {'기준시각': response.data.collection_datetime, '확진환자': 0, '격리해제': 0, '격리중': 0, '사망': 0}
const KoreaStateTable = ({ accState }) => {
    return (
        <div>
            <h3>
                누적 확진자 현황 <small>({moment(accState.기준시각).format('M/D h')}시 기준)</small>
            </h3>
            <div className='table-responsive'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th className='text-center success'>확진환자</th>
                            <th className='text-center success'>격리해제</th>
                            <th className='text-center success'>격리중</th>
                            <th className='text-center success'>사망</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-center'>{Number(accState.확진환자).toLocaleString()}</td>
                            <td className='text-center'>{Number(accState.격리해제).toLocaleString()}</td>
                            <td className='text-center'>{Number(accState.격리중).toLocaleString()}</td>
                            <td className='text-center'>{Number(accState.사망).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 값의 출처가 Ajax인 경우 실제 값이 수신되기 까지 시간차가 발생하기 때문에,
// 값이 존재하지 않는 타이밍이 있을 수 있다.
// 이 상황을 방지하기 위해 기본속성을 반드시 정의해야 한다.
KoreaStateTable.defaultProps = {
    accState: {
        기준시각: null,
        확진환자: 0,
        격리해제: 0,
        격리중: 0,
        사망: 0,
    },
};

export default KoreaStateTable;
