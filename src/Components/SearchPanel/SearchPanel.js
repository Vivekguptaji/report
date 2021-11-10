
import { Accordion } from "react-bootstrap";
import ExcelReader from "../../ExcelReader/ExcelReader";  
import { useState } from "react";
import CreateTab from '../Tabs/CreateTab';
import config from '../../Utility/Config';
let requiredData = {};
let uploadedFileArray = [];
function SearchPanel(props) {
    let comingConfig = config;
    const [uploadedFile, setUploadedFile] = useState();
    const generatIssueTypeGroupData = (parsedData,onlyIBM) => {
        let obj = {};
        parsedData.forEach(item => { 
            if (comingConfig.status[[item.Status]] && comingConfig.issueType[[item['Issue Type']]]) {
                if (onlyIBM) {
                    if ( item.Developer && item.Developer.toLowerCase().indexOf('ibm') === -1) {
                        if (obj[item['Issue Type']]) {
                            obj[item['Issue Type']] += 1;
                        }
                        else {
                            obj[item['Issue Type']] = 1;
                        }
                    }
                }
                else {
                    if (obj[item['Issue Type']]) {
                        obj[item['Issue Type']] += 1;
                    }
                    else {
                        obj[item['Issue Type']] = 1;
                    }
                }
            } 
        })
        return obj;
    }
    const generateStoryPointData = (parsedData,onlyIBM) => {
        let obj = {};
        parsedData.forEach(item => {
            let storyPoint = !item['Story Points'] ? 0 : item['Story Points'];  
            if (comingConfig.status[[item.Status]]) { 
                if (onlyIBM) {
                    if (item.Developer.toLowerCase().indexOf('ibm') !== -1) {
                        obj[item.Developer] = 0;
                     }
                    else {
                        obj[item.Developer] ? obj[item.Developer] += storyPoint : obj[item.Developer] = storyPoint;
                    }
                }
                else {
                    obj[item.Developer] ? obj[item.Developer] += storyPoint : obj[item.Developer] = storyPoint;
                }
            }
            
        })
        return obj;
    }
    const getavgSP = (points) => {
        let sp = 0; 
        if (Object.values(points).length > 0) {
            sp = Math.round(Object.values(points).reduce((a, b) => a + b) / Object.values(points).length)
        }
        return sp;
    }
    const exportedData = (data, sprintName, fileName) => {
        if (!uploadedFileArray.includes(fileName)) {
            uploadedFileArray.push(fileName);
            setUploadedFile(uploadedFileArray.join(', '))
        } 
        let parsedData = JSON.parse(data);
        let iBMDeliveredStorypoint =generateStoryPointData(parsedData,true)
        let dataObj = {
            TotalDeliveredStorypoint: generateStoryPointData(parsedData, false),
            IBMDeliveredStorypoint: iBMDeliveredStorypoint,
            TotalResolvedDefects: generatIssueTypeGroupData(parsedData, false),
            IBMResolvedDefects: generatIssueTypeGroupData(parsedData, true),
            avgSP: getavgSP(iBMDeliveredStorypoint)
        }
        if (!requiredData[fileName]) {
            requiredData[fileName] = {
                [sprintName]: dataObj
            }
        } else if (requiredData[fileName]) {
            requiredData[fileName][sprintName] = dataObj
        }
       
        console.log(requiredData)
    }
     
    return <>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Upload CSV File</Accordion.Header>
                <Accordion.Body>
                    <ExcelReader exportedData={exportedData} ></ExcelReader>
                    { }
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        {uploadedFileArray.length > 0 && <div>You have uploaded [ { uploadedFileArray.join(', ')} ]</div>}
        {/* {shareData.length > 0 && <CreateTab data={shareData} removeTabData={removeTabData} updatedChartIndex={updatedChartIndex} onStatusFiledChange={onStatusFiledChange} ></CreateTab>} */}
    </>
}
export default SearchPanel;