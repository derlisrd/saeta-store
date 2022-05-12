import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;



const ExportExcelFile = ({element,data, columns,  sheetname="Archivo",filename,obs=""})=>{


  


        return (
            <ExcelFile filename={filename} element={element ? element : <button>Download</button>}>

                <ExcelSheet data={data} name={sheetname}>
                  {
                   columns.map((elem,index)=>(
                      <ExcelColumn key={index} label={elem.title} value={elem.field }  />
                    ))
                  }
                </ExcelSheet>
            </ExcelFile>
        );

}

export default ExportExcelFile


/**
 * <ExcelFile filename={filename} element={element ? element : <button>download</button>}>
                <ExcelSheet  data={data} name={sheetname}>
                  {
                   column.map((elem,index)=>(
                      <ExcelColumn key={index} label={elem.title} value={elem.field }  />
                    ))
                  }
                    <ExcelColumn label={elem.title} value={elem.field }  />
                </ExcelSheet>
            </ExcelFile>
 */