import { Card, Col, Row ,Container, Tab,Tabs} from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import Config from "../../Utility/Config";
import { TramRounded } from "@material-ui/icons";
import StoryPointReport from "../Reports/StoryPointReport";
import ResourcesPerformance from "../ResourcesPerformance/ResourcesPerformance";
import BarChart from "../Charts/BarChart";
let reports = {
    aem: {
        columns: [
            { title: 'Resource Name', field: 'resourceName' },
            { title: '21.15(Aug)', field: '21.15(Aug)' },
            { title: '21.16(Aug)', field: '21.16(Aug)' },
            { title: '21.17(Aug)', field: '21.17(Aug)' },
            { title: '21.18(Aug)', field: '21.18(Aug)' }],
        data: [{
            resourceName: 'Vivek',
            ['21.15(Aug)']: 9,
            ['21.16(Aug)']: 10,
            ['21.17(Aug)']: 30,
            ['21.18(Aug)']: 7
        
        },{
            resourceName: 'Amit',
            ['21.15(Aug)']: 9,
            ['21.16(Aug)']: 10,
            ['21.17(Aug)']: 30,
            ['21.18(Aug)']: 7
        
        }]
    },
    ui: {},
    fullstack: {},
    oms: {}
}
const getStoryPoints = (values) => {
    let obj = {
        iBMDeliveredStorypointTotal: 0,
        totalDeliveredStorypointTotal: 0
    }
    let iBMDeliveredStorypointTotalArray = [];
    let totalDeliveredStorypointTotalArray = [];
    values.forEach(element => {
        iBMDeliveredStorypointTotalArray.push(element['IBMDeliveredStorypointTotal']);
        totalDeliveredStorypointTotalArray.push(element['IBMDeliveredStorypointTotal'])
    });
    return obj = {
        iBMDeliveredStorypointTotal: iBMDeliveredStorypointTotalArray,
        totalDeliveredStorypointTotal: totalDeliveredStorypointTotalArray
    }
}
const getDefectsPoints = (values) => {
    let obj = {
        iBMDefectsPointsTotal: 0,
        totalDefectsPointsTotal: 0
    }
    let iBMDeliveredDefectsPointsTotalArray = [];
    let totalDeliveredDefectsPointsTotalArray = [];
    values.forEach(element => {
        iBMDeliveredDefectsPointsTotalArray.push(Object.values(element["IBMResolvedDefects"]));
        totalDeliveredDefectsPointsTotalArray.push(Object.values(element["TotalResolvedDefects"]))
    });
    return obj = {
        iBMDefectsPointsTotal: iBMDeliveredDefectsPointsTotalArray,
        totalDefectsPointsTotal: totalDeliveredDefectsPointsTotalArray
    }
}
const getAvgSp = (values) => {
    let obj = {
        ibmAvgSP: 0,
        totalAvgSP: 0
    }
    let ibmAvgSPArray = [];
    let totalAvgSPArray = [];
    values.forEach(element => {
        ibmAvgSPArray.push(element['iBMAvgSP']);
        totalAvgSPArray.push(element['totalAvgSP'])
    }); 
    let ibmSP = Math.round(ibmAvgSPArray.reduce((a, b) => a + b) / ibmAvgSPArray.length);
    let totalSP = Math.round(totalAvgSPArray.reduce((a, b) => a + b) / totalAvgSPArray.length); 
    return obj = {
        ibmAvgSP: Array(ibmAvgSPArray.length).fill(ibmSP),
        totalAvgSP: Array(totalAvgSPArray.length).fill(totalSP)
    }
}
const getLinear = (values) => {
    return   [3, 18, 9, 7, 10]
}
const getChartData = (dataObj) => {
    let chartDataObj = {}
    let storyPoints = getStoryPoints(Object.values(dataObj));
    let defectsPoints = getDefectsPoints(Object.values(dataObj));
    let avgSP = getAvgSp(Object.values(dataObj));
    chartDataObj = {
        series: Object.keys(dataObj),
        iBMStoryPoints: storyPoints['iBMDeliveredStorypointTotal'],
        totalDeliveredStorypointTotal: storyPoints['totalDeliveredStorypointTotal'],
        iBMDefectsPoints: defectsPoints['iBMDefectsPointsTotal'],
        totalDefectsPointsTotal: defectsPoints['totalDefectsPointsTotal'],
        iBMAvgSp: avgSP['ibmAvgSP'],
        totalAvgSp: avgSP['totalAvgSP'],
        linear: getLinear(Object.values(dataObj))
    }
    return chartDataObj;
}
const getResourcePerformanceChart = (dataObj) => {
    let deveploersArray = [];
    for (let key in dataObj) {
        let devps = Object.keys(dataObj[key]['deveploers']);
        for (let i = 0; i < devps.length; i++) {
            if (!deveploersArray.includes(devps[i])) {
                deveploersArray.push(devps[i])
            }
        }
    }
    let newObj = [];
    deveploersArray.forEach(dev => {
        for (let key in dataObj) {
            let points = dataObj[key]['TotalDeliveredStorypoint'][dev] === undefined ? 0 : dataObj[key]['TotalDeliveredStorypoint'][dev];
            let index = newObj.findIndex(item => {
                let value = item[dev]
                if (!value) {
                    return false;
                }
                else {
                    return value["deveploer"] === dev
                }
            }); 
            if (index !== -1) {
                let values = newObj[index];
                let newValue = Object.values(values);
                values[dev].name.push(key);
                values[dev].data.push(points);
                
            }
            else {
                let obj = {
                    [dev]: {
                        deveploer: dev,
                        name: [key],
                        type: 'column',
                        data: [
                            points
                        ]
                    }
                }
                newObj.push(obj);
            }
        }
    })
    return newObj;
}
const getReportData = (dataObj) => { 
    let columnArray = [{ title: 'Resource Name', field: 'deveploer' }];
    let columnsObj = Object.keys(dataObj);
    let dataArray = [];
    let deveploersArray = [];
    columnsObj.forEach(item => { 
        columnArray.push({ title: item, field: item });
    })
    for (let key in dataObj) { 
        let devps = Object.keys(dataObj[key]['deveploers']);
        for (let i = 0; i < devps.length; i++) {
            if (!deveploersArray.includes(devps[i])) {
                deveploersArray.push(devps[i])
            }
        } 
    }
    let newObj = [];
    deveploersArray.forEach(dev => { 
        for (let key in dataObj) {
            let points = dataObj[key]['TotalDeliveredStorypoint'][dev] === undefined ?0 :dataObj[key]['TotalDeliveredStorypoint'][dev];
         
            let index = newObj.findIndex(item => item.deveploer === dev);
            if (index !== -1) {
                let values = newObj[index];
                values[key] = points;
                newObj[index] = values;
            }
            else {
                newObj.push({ deveploer: dev, [key]: points });
            }
        }
    }) 
    return {
        columns: columnArray,
        data: newObj
    }
}
function Dashboard(props) {
    let dashboardData = props.data; 
    let omsDataObj = {}
    let aemDataObj = {}
    let fullstackDataObj = {}
    let uiDataObj = {};
    let dataObj = {};
    let aemReportObj = {};
    let omsReportObj = {};
    let uiReportObj = {};
    let fullStackReportObj = {};
    let aemResourcePerformanceChart = {};
    for (let key in dashboardData) { 
        dataObj = dashboardData[key]; 
        if (key.toLowerCase().indexOf('aem') != -1) {
            aemDataObj = getChartData(dataObj);
            aemReportObj = getReportData(dataObj); 
           // aemResourcePerformanceChart = getResourcePerformanceChart(dataObj)
        }
        else if (key.toLowerCase().indexOf('oms') != -1) {
            omsDataObj = getChartData(dataObj);
            omsReportObj = getReportData(dataObj); 
        }
        else if (key.toLowerCase().indexOf('ui') != -1) {
            uiDataObj = getChartData(dataObj);
            uiReportObj = getReportData(dataObj);
        }
        else if (key.toLowerCase().indexOf('fullstack') != -1) {
            fullstackDataObj = getChartData(dataObj);
            fullStackReportObj =  getReportData(dataObj);
        }
    } 
    return <Tabs
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
    >
        <Tab eventKey="Dashboard" key="Dashboard" title="Dashboard">
            <Card border="dark" style={{ margin: '0.5rem' }}>
                <Card.Header>IBM Delivery Metrics</Card.Header>
                <Card.Body>
                    <Container> 
                        <Row>
                            {Object.keys(omsDataObj).length > 0 && <Col><LineChart fullChart={false} data={omsDataObj} linearName='Linear (IBM Delivered StoryPoint)' avgSpName='AVG SP' chartName='IBM OMS' defectName='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                            {Object.keys(aemDataObj).length > 0 && <Col><LineChart fullChart={false} data={aemDataObj} chartName='IBM AEM' linearName='Linear (IBM Delivered StoryPoint)' avgSpName='AVG SP' defectName='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        
                        </Row>
                        <Row>
                            {Object.keys(fullstackDataObj).length > 0 && <Col><LineChart fullChart={false} data={fullstackDataObj} chartName='IBM Fullstack' linearName='Linear (IBM Delivered StoryPoint)' avgSpName='AVG SP' defectName='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                            {Object.keys(uiDataObj).length > 0 && <Col><LineChart fullChart={false} data={uiDataObj} chartName='IBM Frontend' linearName='Linear (IBM Delivered StoryPoint)' avgSpName='AVG SP' defectName='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            <Card border="dark" style={{ margin: '0.5rem' }}>
                <Card.Header>Overall Team Delivery Metrics</Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            {Object.keys(omsDataObj).length > 0 && <Col><LineChart data={omsDataObj} fullChart={true} chartName='Total OMS' linearName='Linear (Total Delivered StoryPoint)' avgSpName='AVG SP' defectName='Total Resolved Defects' seriesName="Total Delivered StoryPoint"></LineChart></Col>}
                            {Object.keys(aemDataObj).length > 0 && <Col><LineChart data={aemDataObj} fullChart={true} chartName='Total AEM' linearName='Linear (Total Delivered StoryPoint)' avgSpName='AVG SP' defectName='Total Resolved Defects' seriesName="Total Delivered StoryPoint" ></LineChart></Col>}
                        
                        </Row>
                        <Row>
                            {Object.keys(fullstackDataObj).length > 0 && <Col><LineChart data={fullstackDataObj} fullChart={true} chartName='Total Fullstack' linearName='Linear (Total Delivered StoryPoint)' avgSpName='AVG SP' defectName='Total Resolved Defects' seriesName="Total Delivered StoryPoint" ></LineChart></Col>}
                            {Object.keys(uiDataObj).length > 0 && <Col><LineChart data={uiDataObj} fullChart={true} chartName='Total Frontend' linearName='Linear (Total Delivered StoryPoint)' avgSpName='AVG SP' defectName='Total Resolved Defects' seriesName="Total Delivered StoryPoint"></LineChart></Col>}
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Tab>
        <Tab eventKey="Resources" key="Resources" title="Resource Performance">
            {Object.keys(aemReportObj).length > 0 && <ResourcesPerformance data={aemReportObj} reportName="AEM Stack" ></ResourcesPerformance>}
            {Object.keys(omsReportObj).length > 0 && <ResourcesPerformance data={omsReportObj} reportName="OMS Stack"></ResourcesPerformance>}
            {Object.keys(fullStackReportObj).length > 0 && <ResourcesPerformance data={fullStackReportObj} reportName="Fullstack Stack"></ResourcesPerformance>}
            {Object.keys(uiReportObj).length > 0 && <ResourcesPerformance data={uiReportObj} reportName="Forntend Stack"></ResourcesPerformance>}
        </Tab>
        <Tab eventKey="ResourcesChar" key="ResourcesChar" title="Resource Performance Chart">
            {Object.keys(aemReportObj).length > 0 && <BarChart data={aemReportObj} chartName="AEM" ></BarChart>}
            {Object.keys(omsReportObj).length > 0 && <BarChart data={aemReportObj} chartName="OMS" ></BarChart>}
            {Object.keys(fullStackReportObj).length > 0 && <BarChart data={fullStackReportObj} chartName="Fullstack" ></BarChart>}
            {Object.keys(uiReportObj).length > 0 && <BarChart data={uiReportObj} chartName="Front End" ></BarChart>}
            
        </Tab>
    </Tabs>
}
export default Dashboard;