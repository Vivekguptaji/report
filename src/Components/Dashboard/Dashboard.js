import { Card, Col, Row ,Container} from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import Config from "../../Utility/Config";
 
const getStoryPoints = (values) => { 
    let storyPoints = [];
    values.forEach(element => {
        storyPoints.push(element.storyPoint)
    });
    return storyPoints
}
const getDefectsPoints = (values) => { 
    let defectsPoints = [];
    values.forEach(element => {
        defectsPoints.push(element.defects)
    });
    return defectsPoints
}
const getAvgSp = (values) => {
   return   [12, 12, 12, 12, 12]
}
const getLinear = (values) => {
    return   [3, 18, 9, 7, 10]
 }
function Dashboard(props) {
    let configData = Config;
    let dashboardData = props.comingData[0]["dashboardChartData"];
    let omsData = dashboardData['oms'];
    let omsDataObj = {}
    if (omsData) {
        omsDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(omsData)),
            defectsPoints: getDefectsPoints(Object.values(omsData)),
            avgSp: getAvgSp(Object.values(omsData)),
            linear: getLinear(Object.values(omsData))
        }
    }
    let aemData = dashboardData['aem'];
    let aemDataObj = {}
    if (aemData) {
        aemDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(aemData)),
            defectsPoints: getDefectsPoints(Object.values(aemData)),
            avgSp: getAvgSp(Object.values(omsData)),
            linear: getLinear(Object.values(omsData))
        }
    }
    let uiData = dashboardData['ui'];
    let uiDataObj = {}
    if (uiData) {
        uiDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(uiData)),
            defectsPoints: getDefectsPoints(Object.values(uiData)),
            avgSp: getAvgSp(Object.values(omsData)),
            linear: getLinear(Object.values(omsData))
        }
    }
    let fullstackData = dashboardData['fullstack'];
    let fullstackDataObj = {}
    if (fullstackData) {
        fullstackDataObj = {
            series: Object.keys(omsData),
            storyPoints: getStoryPoints(Object.values(fullstackData)),
            defectsPoints: getDefectsPoints(Object.values(fullstackData)),
            avgSp: getAvgSp(Object.values(omsData)),
            linear: getLinear(Object.values(omsData))
        }
    }
    return <>
        <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>IBM Delivery Metrics</Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        {Object.keys(omsDataObj).length > 0 && <Col><LineChart data={omsDataObj} linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP' chartName='IBM OMS' defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        {Object.keys(aemDataObj).length > 0 && <Col><LineChart data={aemDataObj} chartName='IBM AEM'  linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        
                    </Row>
                    <Row> 
                        {Object.keys(fullstackDataObj).length > 0 && <Col><LineChart data={fullstackDataObj} chartName='IBM Fullstack'  linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                        {Object.keys(uiDataObj).length > 0 && <Col><LineChart data={uiDataObj} chartName='IBM Frontend'  linearName ='Linear (IBM Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='IBM Resolved Defects' seriesName="IBM Delivered StoryPoint"></LineChart></Col>}
                    </Row>
                </Container>
            </Card.Body>
        </Card>
         <Card border="dark" style={{ margin: '0.5rem' }}>
            <Card.Header>Overall Team Delivery Metrics</Card.Header>
            <Card.Body>
            <Container>
                    <Row>
                        {Object.keys(omsDataObj).length > 0 && <Col><LineChart data={omsDataObj} chartName='Total OMS'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint"></LineChart></Col>}
                        {Object.keys(aemDataObj).length > 0 && <Col><LineChart data={aemDataObj} chartName='Total AEM'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'  defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint" ></LineChart></Col>}
                        
                    </Row>
                    <Row> 
                        {Object.keys(fullstackDataObj).length > 0 && <Col><LineChart data={fullstackDataObj} chartName='Total Fullstack'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint" ></LineChart></Col>}
                        {Object.keys(uiDataObj).length > 0 && <Col><LineChart data={uiDataObj} chartName='Total Frontend'  linearName ='Linear (Total Delivered StoryPoint)' avgSpName= 'AVG SP'   defectName ='Total Resolved Defects' seriesName="Total Delivered StoryPoint"></LineChart></Col>}
                    </Row>
                </Container>
            </Card.Body>
        </Card>  
    </>
}
export default Dashboard;