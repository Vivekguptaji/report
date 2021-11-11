import MaterialTable from "material-table";
import PatchedPagination from './PatchedPagination'
function StoryPointReport(props) {
    let data = []; 
    data.push({
        'sprint': props.data['series'],
        'totalDeliveredStorypointTotal': props.data['totalDeliveredStorypointTotal'],
        'iBMStoryPoints': props.data['iBMStoryPoints'],
        'totalDeliveredStorypointTotal': props.data['totalDeliveredStorypointTotal'],
        
    })
    debugger;
    return (
        <MaterialTable
            components={{
                Pagination: PatchedPagination,
            }}
            title={'Story Point of ' + props.reportName}
            columns={[
                { title: 'Sprint#', field: 'sprint' },
                { title: 'Total Delivered Storypoint', field: 'totalDeliveredStorypointTotal' },
                { title: 'IBM Delivered Storypoint', field: 'iBMStoryPoints' },
                { title: 'Total Resolved  Defects', field: 'totalDefectsPointsTotal' },
                { title: 'IBM Resolved  Defects', field: 'iBMDefectsPoints' },
                { title: 'Total Avg SP', field: 'totalAvgSp' },
                { title: 'IBM Avg SP', field: 'iBMAvgSp' },
            ]}
            data={
                props.data
            }
            options={{
                exportButton: true,
                exportFileName: props.reportName
            }}
        />
    )
}
  
export default StoryPointReport;