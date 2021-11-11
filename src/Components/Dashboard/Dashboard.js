import { Card, Col, Row ,Container} from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import Config from "../../Utility/Config";
import { TramRounded } from "@material-ui/icons";
 
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
    debugger;
    return obj = {
        ibmAvgSP: Array(ibmAvgSPArray.length).fill(ibmSP),
        totalAvgSP: Array(totalAvgSPArray.length).fill(totalSP)
    }
}
const getLinear = (values) => {
    return   [3, 18, 9, 7, 10,15,20]
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
function Dashboard(props) { 
    let dashboardData = props.data;
    debugger;
    let omsDataObj = {}
    let aemDataObj = {}
    let fullstackDataObj = {}
    let uiDataObj = {};
    let dataObj = {};
    for (let key in dashboardData) { 
        dataObj = dashboardData[key];
        if (key.toLowerCase().indexOf('aem') != -1) { 
            aemDataObj = getChartData(dataObj);
        }
        else if (key.toLowerCase().indexOf('oms') != -1) {
            omsDataObj = getChartData(dataObj);
        } 
        else if (key.toLowerCase().indexOf('ui') != -1) {
            uiDataObj = getChartData(dataObj);
        } 
        else if (key.toLowerCase().indexOf('fullstack') != -1) {
            fullstackDataObj = getChartData(dataObj);
        }
    } 
    return <>
        <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>IBM Delivery Metrics</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        {Object.keys(omsDataObj).length > 0 && <Col><LineChart fullChart={ false}  data={omsDataObj} linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP' chartName='IBM OMS' defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        {Object.keys(aemDataObj).length > 0 && <Col><LineChart fullChart={ false}  data={aemDataObj} chartName='IBM AEM'  linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        
                    </Row>
                    <Row> 
                        {Object.keys(fullstackDataObj).length > 0 && <Col><LineChart fullChart={ false}  data={fullstackDataObj} chartName='IBM Fullstack'  linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        {Object.keys(uiDataObj).length > 0 && <Col><LineChart fullChart={ false}  data={uiDataObj} chartName='IBM Frontend'  linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
         <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>Overall Team Delivery Metrics</Card.Header>
            <Card.Body>
            <Container>
                    <Row>
                        {Object.keys(omsDataObj).length > 0 && <Col><LineChart data={omsDataObj} fullChart={ true} chartName='Total OMS'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint"></LineChart></Col>}
                        {Object.keys(aemDataObj).length > 0 && <Col><LineChart data={aemDataObj} fullChart={ true}  chartName='Total AEM'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'  defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint" ></LineChart></Col>}
                        
                    </Row>
                    <Row> 
                        {Object.keys(fullstackDataObj).length > 0 && <Col><LineChart data={fullstackDataObj} fullChart={ true}  chartName='Total Fullstack'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint" ></LineChart></Col>}
                        {Object.keys(uiDataObj).length > 0 && <Col><LineChart data={uiDataObj} fullChart={ true}  chartName='Total Frontend'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint"></LineChart></Col>}
                    </Row>
                </Container>
            </Card.Body>
        </Card>  
    </>
}
export default Dashboard;