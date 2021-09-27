import "./app.css"
import SalesSummery from "./components/SalesSummery"
import React, { useState } from "react"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import Select from '@mui/material/Select';


function App() {


  const [filterData, setfilterData] = useState({ startDate: "", endDate: "", inputString: "", platform: "" })


  function changeDate(value) {

    if (value === "All") {
      setfilterData({ ...filterData, platform: "All" })
    } else if (value === "UI8") {
      setfilterData({ ...filterData, platform: "UI8" })
    } else if (value === "CG") {
      setfilterData({ ...filterData, platform: "CG" })
    } else if (value === "BM") {
      setfilterData({ ...filterData, platform: "BM" })
    } else if (value === "Jun") {
      setfilterData({ ...filterData, startDate: new Date("Mon Jun 1 2021"), endDate: new Date("Mon Jun 30 2021"), inputString: "Jun" })
    } else if (value === "Jul") {
      setfilterData({ ...filterData, startDate: new Date("Mon Jul 1 2021"), endDate: new Date("Mon Jul 30 2021"), inputString: "Jul" })
    } else if (value === "Aug") {
      setfilterData({ ...filterData, startDate: new Date("Mon Aug 1 2021"), endDate: new Date("Mon Aug 31 2021"), inputString: "Aug" })
    } else if (value === "Sep") {
      setfilterData({ ...filterData, startDate: new Date("Mon Sep 1 2021"), endDate: new Date("Mon Sep 30 2021"), inputString: "Sep" })
    }
  }

  console.log(filterData);

  // function changePlatform(platform) {
  //   if (platform === "All") {
  //     setfilterData({ ...filterData, platform: "All" })
  //   }
  //   else if (platform === "UI8") {
  //     setfilterData({ ...filterData, platform: "UI8" })
  //   }
  //   else if (platform === "CG") {
  //     setfilterData({ ...filterData, platform: "CG" })

  //   }
  //   console.log(filterData);

  // }

  return (
    <div className="App">

      {/* Works awesome, now need to add anotehr sales data and filter it  */}
      <div>

        <h1>{filterData.startDate.toString()}</h1>
        <h1>{filterData.endDate.toString()}</h1>

        <Box sx={{ minWidth: 120, maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Date</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterData.inputString}
              label="Date"
            // onChange=
            >
              <MenuItem onClick={() => changeDate("2021")} value={"2021"}>2021</MenuItem>
              <MenuItem onClick={() => changeDate("Jun")} value={"Jun"}>Jun</MenuItem>
              <MenuItem onClick={() => changeDate("Jul")} value={"Jul"}>July</MenuItem>
              <MenuItem onClick={() => changeDate("Aug")} value={"Aug"}>Aug</MenuItem>
              <MenuItem onClick={() => changeDate("Sep")} value={"Sep"}>Sep</MenuItem>
            </Select>
            <FormHelperText>Select Date</FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120, maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Platform</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterData.platform}
              label="Platform"
            // onChange=
            >
              <MenuItem onClick={() => changeDate("All")} value={"All"}>All</MenuItem>
              <MenuItem onClick={() => changeDate("UI8")} value={"UI8"}>UI8</MenuItem>
              <MenuItem onClick={() => changeDate("CG")} value={"CG"}>CGTrader</MenuItem>
              <MenuItem onClick={() => changeDate("BM")} value={"BM"}>BlenderMarket</MenuItem>
            </Select>
            <FormHelperText>Select Platform</FormHelperText>
          </FormControl>
        </Box>

      </div>

      <SalesSummery platform={filterData.platform} startDate={filterData.startDate} endDate={filterData.endDate} />


    </div >
  );
}

export default App;
