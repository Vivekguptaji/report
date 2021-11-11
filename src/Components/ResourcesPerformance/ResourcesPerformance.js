import BasicExport from "../Reports/BasicExport";

function ResourcesPerformance(props) { 
    return <BasicExport data={props.data} reportName={ props.reportName}></BasicExport>
 }

export default ResourcesPerformance;