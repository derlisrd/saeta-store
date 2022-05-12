import printJS from "print-js";
import ReactToPdf from "react-to-pdf";
import { CSVLink } from "react-csv";
import {Table,TableContainer,TableHead,TableRow,TableCell,TableBody,Icon,Avatar,Typography,Grid,Button,Alert,Box} from "@mui/material/";
import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";
import { Funciones } from "../Funciones/Funciones";
import TablasSkeleton from "./TablasSkeleton";
import ExportExcelFile from "./ExportExcelFile";
import ImagenViewer from "./ImagenViewer";
const style = makeStyles((theme) => ({
  tableContainer: {
    position: "relative",
    overflowX: "unset",
    marginBottom: 25,
    padding: 5,
    backgroundColor: theme.palette.background.paper,
    transition: "all 0.1s linear",
  },
  tableheader: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    position: "sticky",
    top: "63px",
    zIndex: 10,
    transition: "all 0.2s linear",
    backgroundColor: theme.palette.background.default,
  },
  head: {
    marginBottom: "15px"
  },
  tablecell: {
    
  },
  tablelist: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      margin: "0 0 10px 0",
      borderBottom: "1px solid silver",
    },
    borderRadius: "8px",
  },
  tableitem: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  columname: {
    display: "none",
    textTransform: "uppercase",
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  },
  bold: {
    fontWeight: "bold",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    padding: 25,
  },
  ButtonAcciones: {
    margin: "0 5px",
  },
}));

const Tablas = ({
  nombretabla,subtitle,columnas,filas,icono,Acciones,extraprops,namecolumnID,
  extra,search,cargando,showOptions,option = "opciones",
  print,exportCSV,exportPDF,exportExcel,caption
}) => {
  const [modal,setModal] = useState({src:"",open:false});
  const classes = style();
  const refPDF = useRef(null);
  if (!columnas) return <h1>Falta el props "columnas"</h1>;
  
  if (!Acciones) {
    return <h1>Falta el props "Acciones"</h1>;
  }
  if (!filas) {
    return <h1>Falta el props "Filas"</h1>;
  }
  var columnasArray = [];
  var headersArray = [];

  columnas.forEach((e) => {
    if (e.NoPrint === true) {
    } else {
      columnasArray.push({ field: e.field, displayName: e.title });
      headersArray.push({ label: e.title, key: e.field });
    }
  });
  
  const openImagenViewer = (url)=>setModal({open:true,src:url})
  return (
    <>
       <ImagenViewer open={modal.open} isClose={()=>setModal({...modal,open:false})} imgSrc={modal.src} /> 
      <Grid
        container
        spacing={1}
        justify="space-evenly"
        className={classes.head}
      >
        {icono && (
          <Grid item xs={12} md={1} zeroMinWidth>
            <Avatar variant="rounded" className={classes.avatar}>
              <Icon fontSize="large">{icono}</Icon>
            </Avatar>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={11} zeroMinWidth>
          <Typography variant="button">{nombretabla}</Typography>
          <br />
          <Typography variant="caption">{subtitle}</Typography>
        </Grid>

        <Grid xs={12} item sm={12} md={6}>
          {extra && extra}
        </Grid>
        <Grid xs={12} item>
          {search && search}
        </Grid>
        <Grid xs={12} item>
          {print && (
            <Button
              className={classes.ButtonAcciones}
              variant="outlined"
              onClick={() => {
                printJS({
                  printable: filas,
                  properties: columnasArray,
                  type: "json",
                  gridHeaderStyle: "color: red;  border: 2px solid #3971A5;",
                  gridStyle: "border: 2px solid #3971A5;",
                  header: `<h3 class="custom-h3">${nombretabla}</h3>`,
                  style: ".custom-h3 { color: red; }",
                });
              }}
              startIcon={<Icon>print</Icon>}
            >
              Imprimir
            </Button>
          )}
          {exportCSV && (
            <CSVLink
              data={filas}
              style={{ textDecoration: "none" }}
              headers={headersArray}
              filename={Funciones.fechaActualDMY()}
            >
              <Button
                className={classes.ButtonAcciones}
                startIcon={<Icon>text_snippet</Icon>}
                variant="outlined"
              >
                csv
              </Button>
            </CSVLink>
          )}
          {exportPDF && (
            <ReactToPdf
              targetRef={refPDF}
              filename={Funciones.fechaActualDMY()}
            >
              {({ toPdf }) => (
                <Button
                  className={classes.ButtonAcciones}
                  variant="outlined"
                  startIcon={<Icon>picture_as_pdf</Icon>}
                  onClick={toPdf}
                >
                  PDF
                </Button>
              )}
            </ReactToPdf>
          )}
          {exportExcel && (
            <ExportExcelFile
              columns={columnas}
              data={filas}
              sheetname={nombretabla}
              filename={nombretabla + Funciones.fechaActualDMY()}
              element={
                <Button
                  variant="outlined"
                  startIcon={<Icon>file_download</Icon>}
                >
                  Excel
                </Button>
              }
            />
          )}
        </Grid>
      </Grid>

      {cargando ? (
        <TablasSkeleton columnas={columnas} />
      ) : filas.length > 0 ? (
        <Box boxShadow={2} borderRadius={3}>
        <TableContainer
          id="table_print"
          ref={refPDF}
          className={classes.tableContainer}
        >
          <Table>
            <caption>
              <b> {caption ? caption : nombretabla} </b>
            </caption>
            <TableHead className={classes.tableheader}>
              <TableRow>
                {columnas.map((column, id) => (
                  <TableCell
                    key={id}
                    className={classes.tablecell}
                    align="center"
                  >
                    <Typography variant="overline" className={classes.bold}>
                      {column.title}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell align="center" className={classes.tablecell}>
                  <Typography variant="overline" className={classes.bold}>
                    {option}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filas.map((fila, index) => (
                <TableRow
                  role="checkbox"
                  hover
                  key={fila[namecolumnID] ? fila[namecolumnID] : index}
                  className={classes.tablelist}
                >
                  {columnas.map((column, cid) => (
                    <TableCell
                      className={classes.tableitem}
                      align={column.align ? column.align : "center"}
                      key={cid}
                    >
                      <span className={classes.columname}>
                        {column.title}:{" "}
                      </span>
                      <span
                        style={
                          column.style
                            ? column.style
                            : column.styleCondicion
                            ? column.styleCondicion[fila[column.comparaItem]]
                            : null
                        }
                      >
                        {column.isNumber ? (
                          Funciones.numberSeparator(fila[column.field])
                        ) : column.extra ? (
                          column.extra
                        ) : column.items ? (
                          column.items[fila[column.comparaItem]]
                        ) : column.isDate ? (
                          Funciones.fechaActualDMY(fila[column.field])
                        ) : column.img ? (
                          <Avatar sx={{ width:56, height:56, cursor:"pointer" }} onClick={()=>{openImagenViewer(fila[column.field])}} src={fila[column.field]} alt="img" />
                        ) : (
                          fila[column.field]
                        )}

                        {column.extraitem && column.extraitem}
                      </span>
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {showOptions && (
                      <Acciones
                        filaProps={fila}
                        id={fila[namecolumnID]}
                        extraprops={fila[extraprops]}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
      ) : (
        <Alert icon={<Icon>block</Icon>} severity="warning">
          <Typography variant="body1">No hay registros</Typography>
        </Alert>
      )}
    </>
  );
};

export default Tablas;
