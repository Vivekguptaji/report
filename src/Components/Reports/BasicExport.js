import MaterialTable from "material-table";
import PatchedPagination from './PatchedPagination'
function BasicExport(props) { 
  return (
    <MaterialTable
      components={{
        Pagination: PatchedPagination,
      }}
      title={'Report of ' + props.reportName}
      columns={props.data.columns}
      data={
        props.data.data
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