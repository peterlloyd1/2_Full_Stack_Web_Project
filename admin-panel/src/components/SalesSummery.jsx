import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"
import CGTrader from "../sales_data/cgtrader_sales.json"
import BlenderMarket from "../sales_data/blendermarket_sales.json"
import UI8Test from "../sales_data/ui8_sales_rename_test.json"
var _ = require('lodash');



export default function SalesSummery(props) {

    let combine = _.unionBy(UI8Test, CGTrader, 'id');
    var result = _.unionBy(combine, BlenderMarket, "id")


    // TODO: Things we want to filter.
    //* First we filter the time.
    //* -> Then Platform
    //* -> Then Product

    console.log(props);

    // Filter by all time
    if (props.date === "All Time") {
        console.log(result);
        console.log("FIltering ALL sales " + result.length);

        // Filter by All platform
        if (props.platform === "platformsAll") {
            console.log("Filtering all Platforms");

            // Filter by product
            if (props.product === "productAll") {
                console.log("Filtering all product");
            }
        }
        // // Filter by Plaform UI8
        if (props.platform === "UI8") {
            result = result.filter(function (obj) {
                console.log(obj.platform);
                return obj.platform.match("UI8")


            })
            console.log(result);
        }

    }
    // Writing each month manually like an ape.
    // Filter by time
    else if (props.date === "Jun") {

        result = CGTrader.filter(function (obj) {
            var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
            return date >= props.startDate && date <= props.endDate

        })
        console.log(result);
        // Filter by platform
        // if (props.product_name)


    }

    // Filter by product



    return (
        <div>

            {result.map((sale, i) => {

                return <p key={i}> {sale.sale}  {sale.date} {sale.product_name} {sale.revenue} </p>


            })}

        </div >
    )
}

