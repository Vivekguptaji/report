import MaterialTable from "material-table";
import PatchedPagination from './PatchedPagination'
function StoryPointReport(props) {
    let data = [];
    for (const key in props.data) {
        data.push({ 'Developer': key, 'Points': props.data[key] })
    }
    
    return (
        <MaterialTable
            components={{
                Pagination: PatchedPagination,
            }}
            title={'Story Point of ' + props.fileName}
            columns={[
                { title: 'Developer', field: 'Developer' },
                { title: 'Story Points', field: 'Points' },
            ]}
            data={
                data
            }
            options={{
                exportButton: true,
                exportFileName: 'Basic Report'
            }}
        />
    )
}
  
export default StoryPointReport;