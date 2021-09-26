import "./app.css"
import SalesSummery from "./components/SalesSummery"
//import { Button } from "@material-ui/core"
import React, { useState } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import Select from '@mui/material/Select';


function App() {


  const [dates, setDates] = useState({ startDate: "", endDate: "", inputString: "Select Date" })

  // const [inputString, setInputString] = useState("Select Date");

  function changeContent(value) {


    if (value === "Jun") {
      setDates({ startDate: new Date("Mon Jun 1 2021"), endDate: new Date("Mon Jun 30 2021"), inputString: "Jun" })
    } else if (value === "Jul") {
      setDates({ startDate: new Date("Mon Jul 1 2021"), endDate: new Date("Mon Jul 30 2021"), inputString: "Jul" })
    } else if (value === "Aug") {
      setDates({ startDate: new Date("Mon Aug 1 2021"), endDate: new Date("Mon Aug 31 2021"), inputString: "Aug" })
    } else if (value === "Sep") {
      setDates({ startDate: new Date("Mon Sep 1 2021"), endDate: new Date("Mon Sep 30 2021"), inputString: "Sep" })

    }

  }
  return (
    <div className="App">

      {/* Works awesome, now need to add anotehr sales data and filter it  */}
      <div>

        <h1>{dates.startDate.toString()}</h1>
        <h1>{dates.endDate.toString()}</h1>

        <Box sx={{ minWidth: 120, maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dates.inputStringt}
              label="Date"
            // onChange=
            >
              <MenuItem onClick={() => changeContent("Jun")} value={"Jun"}>Jun</MenuItem>
              <MenuItem onClick={() => changeContent("Jul")} value={"Jul"}>July</MenuItem>
              <MenuItem onClick={() => changeContent("Aug")} value={"Aug"}>Aug</MenuItem>
              <MenuItem onClick={() => changeContent("Sep")} value={"Sep"}>Sep</MenuItem>

            </Select>
            <FormHelperText>Select Date</FormHelperText>

          </FormControl>
        </Box>

      </div>

      <SalesSummery startDate={dates.startDate} endDate={dates.endDate} />



    </div >
  );
}

export default App;
