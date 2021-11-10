import React from 'react';
import Chart from 'react-apexcharts'
let height = 420;
let width = 500;
function BarChart(props) {
    let options = {
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                barHeight: '80%',
                rangeBarGroupRows: false
            },
            fill: {
                type: 'solid'
            },
            legend: {
                position: 'right'
            },
        },
        xaxis: {
            categories: Object.keys(props.data)
        },
         
    }
    let series = [{
        name: 'series-1',
        data: Object.values(props.data)
    }]
    return (
        <>
            <div className="chartTitle" style={{ width: { width } }}>Status Report Summary
                <Chart options={options} series={series} type="bar" width={width} height={height} />
            </div>
        </>
    )
}

export default BarChart;