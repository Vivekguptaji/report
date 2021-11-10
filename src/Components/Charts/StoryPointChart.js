import React from 'react';
import Chart from 'react-apexcharts'
let height = 420;
let width = 500;
function StoryPointChart(props) {
    let options = {
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                barHeight: '50%',
                rangeBarGroupRows: true
            },
            colors: [
                "#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0",
                "#3F51B5", "#546E7A", "#D4526E", "#8D5B4C", "#F86624",
                "#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"
            ],
            legend: {
                position: 'right'
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#255aee',
                    shadeTo: 'light',
                    shadeIntensity: 0.65
                }
            }
            ,
            fill: {
                colors: ['#F44336', '#E91E63', '#9C27B0']
            }
        },
       
        xaxis: {
            name: 'Developer',
            categories: Object.keys(props.data)
        }
         
    }
    let series = [{
        name: 'Points',
        data: Object.values(props.data)
    }]
    return (
        <>
            <div className="chartTitle" style={{ width: { width } }}>Story Point Summary
                <Chart options={options} series={series} type="bar" width={width} height={height} />
            </div>
        </>
    )
}

export default StoryPointChart;