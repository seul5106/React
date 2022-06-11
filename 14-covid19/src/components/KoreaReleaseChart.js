import React from 'react';

import style from "../assets/scss/style.module.scss";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const KoreaReleaseChart = ({ releaseState }) => {
    // 전달받은 데이터를 비구조 문법으로 개별 추출
    const { 날짜, 누적격리해제, 일일격리해제 } = releaseState;
    // 그래프에 표시될 데이터셋
    const data = {
        // 다중 그래프 처리시 데이터 항목들의 정의 (마지막 데이터셋이 화면상에서 뒤에 배치됨)
        datasets: [
            // 누적격리해제 선 그래프
            {
                label: "일일격리해제",
                type: "line",
                data: 일일격리해제,
                borderColor: "#FF8400",
                borderWidth: 2.5,
                pointBorderColor: "#FFFFFF",
                pointBackgroundColor: "#FF8400",
                pointRadius: 6,
                yAxisID: "y2"           // y축에 부여할 식별자 ---> options에서 연결해서 속성을 명시함
            },
            // 누적확진 막대 그래프
            {
                type: "bar",
                label: "누적격리해제",
                data: 누적격리해제,
                backgroundColor: "#3571CC",
                yAxisID: "y1"           // y축에 부여할 식별자 ---> options에서 연결해서 속성을 명시함
            }
        ]
    }

    // 그래프 표시 옵션
    const options = {
        responsive: true, // 반응형 기능 켬
        plugins: {
            legend: {
                position: "bottom"  // 범주 위치 지정
            }
        },
        // 축 정보
        scales: {
            x: {
                display: true,
                gridLines: {
                    display: false,
                },
                labels: 날짜
            },

            y1: {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                    drawOnChartArea: true
                },
                labels: {
                    show: true
                },
                ticks: {
                    fontColor: "#666",
                    fontSize: 10,
                    min: 0,
                    max: (() => {
                        // 배열에서 가장 큰 값 찾기
                        const maxValue = Math.max.apply(null, 누적격리해제);
                        // 찾아낸 최대값의 120% 산출
                        const axisMaxValue = parseInt(maxValue * 1.2);
                        // 값을 1000단위로 끊어냄(올림)
                        const max = Math.floor(axisMaxValue / 1000) * 1000;
                        return max;
                    })(),
                    step: 100
                }
            },
            y2: {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false
                },
                labels: {
                    show: true
                },
                ticks: {
                    fontColor: "#666",
                    fontSize: 10,
                    min: 0,
                    max: (() => {
                        // 배열에서 가장 큰 값 찾기
                        const maxValue = Math.max.apply(null, 일일격리해제);
                        // 찾아낸 최대값의 120% 산출
                        const axisMaxValue = parseInt(maxValue * 1.5);
                        // 값을 1000단위로 끊어냄(올림)
                        const max = Math.floor(axisMaxValue / 10) * 10;
                        return max;
                    })(),
                    step: 10
                }
            }
        }
    }

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    )
};

KoreaReleaseChart.defaultProps = {
    releaseState: {
        날짜: null,
        누적격리해제: 0,
        일일격리해제: 0
    }
}

export default KoreaReleaseChart;