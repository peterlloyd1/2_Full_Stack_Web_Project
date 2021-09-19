import "./app.css"
import SalesSummery from "./components/SalesSummery"
import Button from "@material-ui/core/Button"
import { useState } from "react"

function App() {

  // var startDate = new Date("Mon Jul 1 2021 00:00:00 GMT+0300 (Eastern European Summer Time)");
  // var endDate = new Date("Mon Jul 30 2021 00:00:00 GMT+0300 (Eastern European Summer Time)");

  const [date, setDate] = useState({ "startDate": new Date("Mon Jul 1 2021 00:00:00 GMT+0300 (Eastern European Summer Time)"), "endDate": new Date("Mon Jul 30 2021 00:00:00 GMT+0300 (Eastern European Summer Time)") });




  return (
    <div className="App">
      {/* TODO: Create a compontent to where we send a date and in return we recive data for that month */}
      <SalesSummery startDate={date.startDate} endDate={date.endDate} />

    </div >
  );
}

export default App;
