import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"
import CGTrader from "../sales_data/cgtrader_sales.json"
import BlenderMarket from "../sales_data/blendermarket_sales.json"
import UI8Test from "../sales_data/ui8_sales_rename_test.json"
var _ = require('lodash');



export default function SalesSummery(props) {

    let combine = _.unionBy(UI8Test, CGTrader, 'id');
    var result = _.unionBy(combine, BlenderMarket, "id")
    var month_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    function filterPlatform(platform) {

        console.log(platform + " = " + props.platform);
        if (props.platform === platform) {
            result = result.filter(function (obj) {
                return obj.platform.match(platform)

            })
            // Filter by product 1 & product 2 & all products
            if (props.product === "productAll") {
                console.log("Filtering all product");
            }
            else if (props.product === 'Cartoon Man And Woman Rigged') {
                result = result.filter(function (obj) {
                    return obj.product_name.match("Cartoon Man and Woman Rigged")

                })

            }
            else if (props.product === "3D Character Mike back to school/university UI KIT") {
                result = result.filter(function (obj) {
                    return obj.product_name.match("3D Character Mike back to school/university UI KIT")

                })

            }
        }


    }
    // TODO: Things we want to filter.
    //* First we filter the time.
    //* -> Then Platform
    //* -> Then Product

    console.log(props);

    // Filter by all time
    // I could make this as a seperate function and just call it with props.date & other?
    if (props.date === "All Time") {
        console.log(result);

        // Filter by All platform
        if (props.platform === "platformsAll") {
            console.log("Filtering all Platforms");

            // Filter by product
            if (props.product === "productAll") {
                console.log("Filtering all product");
            }

        }
        else if (props.platform === "UI8") {
            filterPlatform("UI8")
        }
        else if (props.platform === "CGTrader") {
            filterPlatform("CGTrader")
            console.log(result)
        }
        else if (props.platform === "BlenderMarket") {
            filterPlatform("BlenderMarket")
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

