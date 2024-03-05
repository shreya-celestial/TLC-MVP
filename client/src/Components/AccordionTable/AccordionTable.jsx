import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from '@mui/material';
import React from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './AccordionTable.styles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
function AccordionTable({ rowData, columnDefs, headingName }) {
  const defaultColDef = {
    sortable: false,
    minWidth: 250,
    flex: 1,
  };

  const gridOptions = {
    rowHeight: 30,
    headerHeight: 30,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: true,
    overlayNoRowsTemplate:"No Records Found",
  };
  const classes = useStyles();
  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        className="accordianSummary"
        expandIcon={<ExpandMoreOutlinedIcon />}
      >
        {headingName} {`(${rowData.length})`}
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
          <AgGridReact
            className={classes.AgGridMain}
            columnDefs={columnDefs}
            rowData={rowData}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionTable;
