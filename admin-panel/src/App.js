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


  const [filterData, setfilterData] = useState({ startDate: "", endDate: "", inputString: "", platform: "", product: "", productString: "" })

  // Something wrong with this loop I think, need to be divided into two.
  function changeDate(value) {

    if (value === "All") {
      setfilterData({ ...filterData, platform: "platformsAll" })
    } else if (value === "UI8") {
      setfilterData({ ...filterData, platform: "UI8" })
    } else if (value === "CGTrader") {
      setfilterData({ ...filterData, platform: "CGTrader" })
    } else if (value === "BlenderMarket") {
      setfilterData({ ...filterData, platform: "BlenderMarket" })
    } else if (value === "productAll") {
      setfilterData({ ...filterData, product: "productAll", productString: "productAll" })
    } else if (value === "product1") {
      setfilterData({ ...filterData, product: "Cartoon Man And Woman Rigged", productString: "Cartoon Man And Woman Rigged" })
    } else if (value === "product2") {
      setfilterData({ ...filterData, product: "3D Character Mike back to school/university UI KIT", productString: "3D Character Mike back to school/university UI KIT" })
    } else if (value === "allTime") {
      setfilterData({ ...filterData, startDate: new Date("Fri Jan 1 2021"), endDate: new Date("Fri Dec 31 2021"), inputString: "All Time" })
    } else if (value === "Jun") {
      setfilterData({ ...filterData, startDate: new Date("Mon Jun 1 2021"), endDate: new Date("Mon Jun 30 2021"), inputString: "Jun" })
    } else if (value === "Jul") {
      setfilterData({ ...filterData, startDate: new Date("Mon Jul 1 2021"), endDate: new Date("Mon Jul 30 2021"), inputString: "Jul" })
    } else if (value === "Aug") {
      setfilterData({ ...filterData, startDate: new Date("Mon Aug 1 2021"), endDate: new Date("Mon Aug 31 2021"), inputString: "Aug" })
    } else if (value === "Sep") {
      setfilterData({ ...filterData, startDate: new Date("Mon Sep 1 2021"), endDate: new Date("Mon Sep 30 2021"), inputString: "Sep" })
    }

    console.log(filterData);
  }


  return (
    <div className="App">

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
            >
              {/* // TODO:Need filter data from all year */}
              <MenuItem onClick={() => changeDate("allTime")} value={"All Time"}>All Time</MenuItem>
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
            >

              {/* Filter all platforms data */}
              <MenuItem onClick={() => changeDate("All")} value={"All"}>All</MenuItem>
              <MenuItem onClick={() => changeDate("UI8")} value={"UI8"}>UI8</MenuItem>
              <MenuItem onClick={() => changeDate("CGTrader")} value={"CGTrader"}>CGTrader</MenuItem>
              <MenuItem onClick={() => changeDate("BlenderMarket")} value={"BlenderMarket"}>BlenderMarket</MenuItem>
            </Select>
            <FormHelperText>Select Platform</FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120, maxWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filterData.productString}
              label="Platform"
            >
              {/* Add an "All" button to display results for all products*/}
              <MenuItem onClick={() => changeDate("productAll")} value={"productAll"}>All</MenuItem>
              <MenuItem onClick={() => changeDate("product1")} value={"Cartoon Man And Woman Rigged"}>Cartoon Man And Woman Rigged</MenuItem>
              <MenuItem onClick={() => changeDate("product2")} value={"3D Character Mike back to school/university UI KIT"}>3D Character Mike back to school/university UI KIT</MenuItem>
            </Select>
            <FormHelperText>Select Product</FormHelperText>
          </FormControl>
        </Box>

      </div>

      <SalesSummery product={filterData.product} platform={filterData.platform} startDate={filterData.startDate} endDate={filterData.endDate} date={filterData.inputString} />


    </div >
  );
}

export default App;
