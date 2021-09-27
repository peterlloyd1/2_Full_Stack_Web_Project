import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"
import CGTrader from "../sales_data/blendermarket_sales.json"
import BlenderMarket from "../sales_data/blendermarket_sales.json"

console.log(BlenderMarket);

export default function SalesSummery(props) {
    // eslint-disable-next-line
    let ui8_revenue_product_01, ui8_revenue_product_02 = 0

    // How do we filter all data?

    if (props.platform === "UI8") {

        var result = UI8.filter(function (obj) {
            // My date thingy is trash need to reforumalte to filter.
            // console.log("20" + parseInt(obj.date.slice(-2))) // Year
            // console.log(parseInt(obj.date.slice(0, 2))) // Day
            // console.log(parseInt(obj.date.slice(3, 5))) // Month


            var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))

            return date >= props.startDate && date <= props.endDate

        })

    } else if (props.platform === "CG") {

        var result = CGTrader.filter(function (obj) {
            console.log("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
            var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
            return date >= props.startDate && date <= props.endDate

        })

    } else if (props.platform === "BM") {

        var result = BlenderMarket.filter(function (obj) {

            var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)), parseInt(obj.date.slice(0, 2)))
            return date >= props.startDate && date <= props.endDate


        })

    }

    else {

        return "No Data for " + props.startDate.toString().substring(3, 16) + " - " + props.endDate.toString().substring(3, 16)

    }


    // UI8.map((sale) => {

    //     if (sale.product_name === "3D Character Illustration Pose Library Pack") {
    //         ui8_revenue_product_01 += parseInt(sale.revenue.slice(1, -3))
    //     }
    //     else {
    //         ui8_revenue_product_02 += parseInt(sale.revenue.slice(1, -3))

    //     }

    //     return null;
    // })

    return (
        <div>

            {result.map((sale) => {

                return <p>{sale.sale}  {sale.date} {sale.product_name} {sale.revenue} </p>


            })}

        </div >
    )
}

