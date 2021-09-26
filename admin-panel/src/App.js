import "./app.css"
import SalesSummery from "./components/SalesSummery"
import { Button, InputLabel, MenuItem, FormHelperText, FormControl, Select } from "@material-ui/core"
import React, { useState } from "react"

function App() {


  const [dates, setDates] = useState({ startDate: new Date("Mon Jul 1 2021"), endDate: new Date("Mon Jul 30 2021") })

  const [state, setstate] = useState("halwa");

  function changeContent(value) {


    if (value === "Jun") {
      setDates({ startDate: new Date("Mon Jun 1 2021"), endDate: new Date("Mon Jun 30 2021") })
    } else if (value === "Jul") {
      setDates({ startDate: new Date("Mon Jul 1 2021"), endDate: new Date("Mon Jul 30 2021") })
    }

  }
  // Trying to chagne date based on event input so if its Jan, we call date and change it?
  return (
    <div className="App">
      {/* TODO: Create a compontent to where we send a date and in return we recive data for that month */}


      <div>
        <Button onClick={() => changeContent("Jun")}>Jun</Button>
        <Button onClick={() => changeContent("Jul")}>Jul</Button>
        <h1>{dates.startDate.toString()}</h1>
        <h1>{dates.endDate.toString()}</h1>

      </div>

      <SalesSummery startDate={dates.startDate} endDate={dates.endDate} />



    </div >
  );
}

export default App;
