
import ReactApexChart from "react-apexcharts";
let sprintName = [];
function LineChart(props) {
    const chartName = props.chartName;
    let chartData = props.data; 
    let series = [{
        name: props.seriesName,
        type: 'column',
        data: props.fullChart ? chartData.totalDeliveredStorypointTotal : chartData.iBMStoryPoints
    }, {
        name: props.defectName,
        type: 'column',
        data: props.fullChart ? chartData.totalDefectsPointsTotal : chartData.iBMDefectsPoints
    }, {
        name: props.avgSpName,
        type: 'line',
        data: props.fullChart ? chartData.totalAvgSp : chartData.iBMAvgSp
    },
    {
        name: props.linearName,
        type: 'line',
        data: chartData.linear
    }];
    let options = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
        },
        stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
            
        fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
                inverseColors: false,
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 0.55,
                stops: [0, 100, 100, 100]
            }
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0, 1, 2, 3]
        },
        // labels: ['21.16 (Aug)', '21.17 (Aug)', '21.18 (Aug)', '21.19 (Aug)',
        // '21.20 (Aug)', '21.21 (Aug)', '21.22 (Aug)', '21.23 (Aug)', 
        // ],
        labels: chartData.series,
        markers: {
            size: 0
        },
        xaxis: {
            type: 'Points'
        },
        yaxis: {
            title: {
                text: 'Points',
            },
            min: 0
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + " points";
                    }
                    return y;
            
                }
            }
        }
    }
    return (<div id="chart" className="chartTitle"> {props.chartName} Velocity V/S Defects
        <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>)
}
export default LineChart;