import MaterialTable from "material-table";
import PatchedPagination from './PatchedPagination'
function BasicExport(props) {
  return (
    <MaterialTable
      components={{
        Pagination: PatchedPagination,
      }}
      title={'Report of ' + props.fileName}
      columns={[
        { title: 'Issue Id', field: 'Issue id' },
        { title: 'Developer', field: 'Developer' },
        { title: 'Status', field: 'Status' },
        { title: 'Story Points', field: 'Story Points' },
        { title: 'Issue Type', field: 'Issue Type' },
        { title: 'Summary', field: 'Summary' }
      ]}
      data={
        props.data
      }
      options={{
        exportButton: true,
        exportFileName: 'Basic Report',
        grouping: true
      }}
    />
  )
}
  
export default BasicExport;