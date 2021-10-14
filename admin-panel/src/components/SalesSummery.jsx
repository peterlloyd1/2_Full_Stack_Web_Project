import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"
import CGTrader from "../sales_data/cgtrader_sales.json"
import BlenderMarket from "../sales_data/blendermarket_sales.json"
import UI8Test from "../sales_data/ui8_sales_rename_test.json"
var _ = require('lodash');



export default function SalesSummery(props) {

    let combine = _.unionBy(UI8Test, CGTrader, 'id');
    var result = _.unionBy(combine, BlenderMarket, "id")

    // eslint-disable-next-line
    let ui8_revenue_product_01, ui8_revenue_product_02 = 0

    // TODO: Things we want to filter.

    //* First we filter the time.
    //* -> Then Platform
    //* -> Then Product

    console.log(props);
    if (props.date === "All Time") {

        console.log(result);
        return result


    } // Maybe a forloop that somehow loops trough all the months? cuz writing all 12 months is kinda dumb
    else if (props.date === "Jun") {

    }



    return (
        <div>

            {result.map((sale, i) => {

                return <p key={i}> {sale.sale}  {sale.date} {sale.product_name} {sale.revenue} </p>


            })}

        </div >
    )
}

