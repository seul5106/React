import React from 'react';

import { HorizontalBar } from 'react-chartjs-2';

const SidoConfirmAccChart = ({chartData}) => {

    /** chart에 표시될 데이터 (막대그래프용) */
    const data = {
        // x축에 나타날 항목들
        labels: chartData.지역명,
        // y축의 값을 비롯한 기타 옵션들
        datasets: [
            {
                // 그래프 제목
                label: '시,도별 누적 확진자 현황',
                backgroundColor: '#15A8DE',
                borderColor: '#15A8DE',
                borderWidth: 0,
                hoverBackgroundColor: '#15A8DE',
                hoverBorderColor: '#15A8DE',
                // 그래프 각 항목별 y축 수치값
                data: chartData.누적확진자,
            }
        ]
    };

    /** 그래프 표시 옵션 */
    const options = {
        // 범주 위치 지정
        legend: { position: 'bottom', },
        // 축 정보
        scales: {
            xAxes: [{
                gridLines: { display: true }
            }],
            yAxes: [{
                gridLines: { display: false }
            }],
        },
    };

    return (
        <HorizontalBar data={data} height={130} options={options} />
    );
};

SidoConfirmAccChart.defaultProps = {
    chartData: {
        지역명: [],
        누적확진자: [],
    },
};

export default SidoConfirmAccChart;