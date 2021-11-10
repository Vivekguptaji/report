import React, { Component } from "react";
import XLSX from "xlsx";
import { make_cols } from '../ExcelReader/MakeColumns'; 
import { Form, Button ,ProgressBar, Spinner} from "react-bootstrap"; 
class ExcelReader extends Component {
  inputField;
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: [],
      showToast: false,
      showProgressbar: false,
      progessValue: 'Report generation is in progress, please wait...',
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    this.inputField = e.target;
    if (files && files[0]) this.setState({ file: files[0], showToast: false });
  }
  callParentfunction(obj) { 
    obj.forEach(item => {
      this.props.exportedData(item.data, item.indexFile, item.fileName)
    }) 
   }
  handleFile() {
    /* Boilerplate to set up FileReader */
    if (!this.state.file['name']) {
      this.setState({ showToast: true });
      return
    }
    this.setState({ showProgressbar: true });
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    let uploadedData = [];
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true,
      }); 
      for (let i = 0; i < wb.SheetNames.length; i++) {
        /* Get first worksheet */
        const wsname = wb.SheetNames[i];
        //console.log('count', wb.SheetNames.length, `i + 1 < wb.SheetNames.length`)        
        this.setState({ showProgressbar: i + 1 < wb.SheetNames.length })
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
          let data = JSON.stringify(this.state.data, null, 2); 
          uploadedData.push({ data: data, indexFile: wsname, fileName: this.state.file.name });
          this.inputField.value = null;
          
         
        });
        if (i + 1 === wb.SheetNames.length) { 
          this.callParentfunction(uploadedData)
          this.setState({ file: {} })
        }
      }
      
    };
  
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Upload Excel to process the report</Form.Label>
          <Form.Control type="file"
            onChange={this.handleChange}></Form.Control>
        </Form.Group>
        {this.state.showToast &&
          <Form.Group className="errorMsg">
            <Form.Label>Please select the file to process the report</Form.Label>
          </Form.Group>}
        <Form.Group className="mb-3" style={{ textAlign: 'center' }} controlId="formBasicPassword">
          <Button disabled={this.state.showProgressbar} variant="dark" onClick={this.handleFile}>Process</Button>{' '}
          {/* <Button disabled={this.state.showProgressbar} variant="success" onClick={this.handleFile}>Generate Dashboard</Button>{' '} */}
        </Form.Group>
        {this.state.showProgressbar &&
          <Form.Group>
            <Form.Label>{this.state.progessValue}</Form.Label> <Spinner animation="grow"></Spinner>
          </Form.Group>}
      </Form>)
  }
}

export default ExcelReader;
{/* <Select options={this.props.options} isMulti="true" defaultValue={this.props.options}
            onChange={this.props.onClick} isClearable={false}></Select> */}