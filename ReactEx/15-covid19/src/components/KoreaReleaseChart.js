import React from 'react';

import { Bar } from 'react-chartjs-2';

const KoreaReleaseChart = ({releaseState}) => {

    const {날짜, 누적격리해제, 일일격리해제} = releaseState;

    /** 그래프에 표시될 데이터셋 */
    const data = {
        // 다중 그래프 처리시 데이터 항목들 정의 (마지막 데이터셋이 화면상에서 뒤에 배치됨)
        datasets: [
            // 일일확진 선 그래프
            {
                label: '일 격리해제',
                type: 'line',
                data: 일일격리해제,
                borderColor: '#1F7CCB',
                borderWidth: 2.5,
                pointBorderColor: '#FFFFFF',
                pointBackgroundColor: '#1F7CCB',
                pointRadius: 6,
                yAxisID: 'y-axis-2'     // y축에 부여할 식별자 --> options에서 연결해서 속성을 명시함.
            },
            // 누적확진 막대 그래프
            {
                type: 'bar',
                label: '누적격리해제',
                data: 누적격리해제,
                backgroundColor: '#E0217B',
                yAxisID: 'y-axis-1'     // y축에 부여할 식별자 --> options에서 연결해서 속성을 명시함.
            },
        ],
    };

    /** 그래프 표시 옵션 */
    const options = {
        responsive: true,       // 반응형 기능 켬
        elements: {
            line: {
                fill: false,    // 지정하지 않을 경우 선 그래프의 아래쪽에 반투명으로 색상이 채워짐
            },
        },
        legend: {
            position: 'bottom'  // 범주 위치 지정
        },
        // 축 정보
        scales: {
            // x축은 두 개의 그래프가 공유하므로 하나의 정보만 정의
            xAxes: [
                {
                    display: true,
                    gridLines: {
                        display: false,
                    },
                    labels: 날짜,
                },
            ],
            // y축은 그래프의 수 만큼 나열되어야 한다.
            yAxes: [
                // 왼쪽 y축
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left',
                    gridLines: {
                        display: true,
                    },
                    labels: {
                        show: true,
                    },
                    ticks: {
                        fontColor: '#666',
                        fontSize: 10,
                        fontFamily: "Lato",
                        min: 0,
                        max: (function(){
                            // 배열에서 가장 큰 값 찾기
                            const maxValue = Math.max.apply(null, 누적격리해제);
                            // 찾아낸 최대값의 120% 산출
                            const axisMaxValue = parseInt(maxValue * 1.2);
                            // 값을 1000단위로 끊어냄(올림)
                            const max = Math.floor(axisMaxValue / 1000) * 1000;
                            return max;
                        })(),
                        stepSize: 2000
                    },
                },
                // 오른쪽 y축
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right',
                    gridLines: {
                        display: false,
                    },
                    labels: {
                        show: true,
                    },
                    ticks: {
                        fontColor: '#666',
                        fontSize: 10,
                        fontFamily: "Lato",
                        min: 0,
                        max: (function(){
                            // 배열에서 가장 큰 값 찾기
                            const maxValue = Math.max.apply(null, 일일격리해제);
                            // 찾아낸 최대값의 150% 산출
                            const axisMaxValue = parseInt(maxValue * 1.5);
                            // 값을 10단위로 끊어냄(올림)
                            const max = parseInt(Math.floor(axisMaxValue / 10) * 10);
                            return max;
                        })(),
                        stepSize: 10
                    },
                },
            ],
        },
    };

    return (
        <div>
            <h3>확진환자 내 일일 및 누적 격리해제 추세</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

KoreaReleaseChart.defaultProps = {
    releaseState: {
        날짜: null,
        누적격리해제: 0,
        일일격리해제: 0
    },
};

export default KoreaReleaseChart;