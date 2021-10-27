import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"
import CGTrader from "../sales_data/cgtrader_sales.json"
import BlenderMarket from "../sales_data/blendermarket_sales.json"
import UI8Test from "../sales_data/ui8_sales_rename_test.json"
var _ = require('lodash');



export default function SalesSummery(props) {

    let combine = _.unionBy(UI8Test, CGTrader, 'id');
    var result = _.unionBy(combine, BlenderMarket, "id")


    function filterPlatform(platform) {

        console.log(platform + " = " + props.platform);
        if (props.platform === platform) {
            result = result.filter(function (obj) {
                return obj.platform.match(platform)

            })
        }

    }

    function filterProduct(product) {
        // Filter by product 1 & product 2 & all products

        console.log(product + " = " + props.product);

        if (props.product === "productAll") {
            console.log("Filtering all product");
        }
        else if (props.product === product) {
            result = result.filter(function (obj) {
                console.log(obj.product_name);
                return obj.product_name.match(product)


            })

        }
    }

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
        else {
            filterPlatform(props.platform)
            filterProduct(props.product)

        }

    }
    else {
        // We create a for loop that filters each month and calls same thing we call in "AllTime"
        // month_array.forEach((month) => {

        //     let startDate = new Date("2021" + month)
        //     // How we make it know its end date?
        //     let endDate = new Date("2021", month - 1, 0)

        //     console.log(month);
        //     console.log(startDate + " til " + endDate);
        // })


        // var month = 0; // January
        // var startDate = new Date(2021, month);
        // var endDate = new Date(2021, month + 1, 0);
        // console.log(startDate + " til " + endDate); // last day in January

        for (let i = 0; i < 12; i++) {
            // 0 = January
            var startDate = new Date(2021, i);
            var endDate = new Date(2021, i + 1, 0);

            if (props.startDate.toString() === startDate.toString()) {
                result = result.filter(function (obj) {
                    var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
                    return date >= startDate && date <= endDate

                })
            }

        }


    }
    // Writing each month manually like an ape.
    // Filter by time
    // else if (props.date === "Jun") {

    //     result = CGTrader.filter(function (obj) {
    //         var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
    //         return date >= props.startDate && date <= props.endDate

    //     })
    //     console.log(result);
    //     // Filter by platform
    //     // if (props.product_name)


    // }

    // Filter by product



    return (
        <div>

            {result.map((sale, i) => {

                return <p key={i}> {sale.sale}  {sale.date} {sale.product_name} {sale.revenue} </p>


            })}

        </div >
    )
}

