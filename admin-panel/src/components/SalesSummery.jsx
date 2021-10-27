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

        for (let i = 0; i < 12; i++) {
            // 0 = January
            var startDate = new Date(2021, i);
            var endDate = new Date(2021, i + 1, 0);

            if (props.startDate.toString() === startDate.toString()) {

                result = result.filter(function (obj) {
                    var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
                    return date >= startDate && date <= endDate

                })
                filterPlatform(props.platform)
                filterProduct(props.product)


            }

        }


    }

    var summery = 0

    // Next goal, actually useable using this date display in a graph
    return (
        <div>

            {result.map((sale, i) => {
                // <p key={i}> {sale.sale}  {sale.date} {sale.product_name} {sale.revenue} </p>
                console.log(sale.revenue.slice(1, -3));
                summery += parseInt(sale.revenue.slice(1, -3))



                console.log(summery);
            })}
            <h2>{props.product} geneated {summery} starting in {props.startDate.toString().slice(3, 7)} </h2>

        </div >
    )
}

