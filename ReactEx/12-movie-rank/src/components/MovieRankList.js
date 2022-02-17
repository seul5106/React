import React from 'react';

const MovieRankList = ({ boxOfficeResult }) => {
    return (
        <div className='table-responsive'>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th className='text-center'>순위</th>
                        <th className='text-center'>제목</th>
                        <th className='text-center'>관람객 수</th>
                        <th className='text-center'>매출액</th>
                        <th className='text-center'>누적 관람객 수</th>
                        <th className='text-center'>누적 매출액</th>
                    </tr>
                </thead>
                <tbody>
                    {boxOfficeResult.dailyBoxOfficeList.map((item, index) => (
                        <tr key={index}>
                            <td className='text-center'>{item.rank}</td>
                            <td className='text-center'>{item.movieNm}</td>
                            <td className='text-center'>{Number(item.audiCnt).toLocaleString()}명</td>
                            <td className='text-center'>{Number(item.salesAmt).toLocaleString()}원</td>
                            <td className='text-center'>{Number(item.audiAcc).toLocaleString()}명</td>
                            <td className='text-center'>{Number(item.salesAcc).toLocaleString()}원</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// 검색 결과가 없을 경우를 대비해 화면 출력에 사용되는 json-key에 대한 기본값을 정의해 둔다.
MovieRankList.defaultProps = {
    boxOfficeResult: {
        dailyBoxOfficeList: []
    }
}

export default MovieRankList;
