import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"


export default function SalesSummery(props) {

    console.log(props.endDate);
    // var startDate = new Date("Mon Jul 1 2021 00:00:00 GMT+0300 (Eastern European Summer Time)");
    // var endDate = new Date("Mon Jul 30 2021 00:00:00 GMT+0300 (Eastern European Summer Time)");

    let ui8_revenue_product_01 = 0
    let ui8_revenue_product_02 = 0

    var result = UI8.filter(function (obj) {
        // My date thingy is trash need to reforumalte to filter.
        // console.log("20" + parseInt(obj.date.slice(-2))) // Year
        // console.log(parseInt(obj.date.slice(0, 2))) // Day
        // console.log(parseInt(obj.date.slice(3, 5))) // Month

        var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))

        return date >= props.startDate && date <= props.endDate

    })

    result.map((sale) => {
        console.log(sale);
    })

    UI8.map((sale) => {

        if (sale.product_name === "3D Character Illustration Pose Library Pack") {
            ui8_revenue_product_01 += parseInt(sale.revenue.slice(1, -3))
        }
        else {
            ui8_revenue_product_02 += parseInt(sale.revenue.slice(1, -3))

        }

        return null;
    })

    return (
        <div>
            <h1>Product 1 generate {ui8_revenue_product_01}</h1>
            <h1>Product 2 generate {ui8_revenue_product_02}</h1>
        </div >
    )
}

