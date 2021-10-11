import React from 'react'
import UI8 from "../sales_data/ui8_sales.json"
import CGTrader from "../sales_data/cgtrader_sales.json"
import BlenderMarket from "../sales_data/blendermarket_sales.json"
import UI8Test from "../sales_data/ui8_sales_rename_test.json"
var _ = require('lodash');



export default function SalesSummery(props) {

    var result
    // eslint-disable-next-line
    let ui8_revenue_product_01, ui8_revenue_product_02 = 0

    // TODO: Add a if that check if platform is all and then by produc, need to combine all of sales data into one
    // Filter by platform, add "Platform": to json data?


    if (props.platform === "platformsAll") {
        // Need combine all products in one json and then check which product was selected. Maybe just filter it all from here and just check with platform is selected?

        let combine = _.unionBy(UI8Test, CGTrader, 'id');

        result = _.unionBy(combine, BlenderMarket, "id")
        console.log(result);



    }

    else if (props.platform === "UI8") {

        result = UI8Test.filter(function (obj) {
            // My date thingy is trash need to reforumalte to filter.
            // console.log("20" + parseInt(obj.date.slice(-2))) // Year
            // console.log(parseInt(obj.date.slice(0, 2))) // Day
            // console.log(parseInt(obj.date.slice(3, 5))) // Month


            let date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))

            return date >= props.startDate && date <= props.endDate

        })

        // Filter by product name 
        if (props.product === "3D Character Mike back to school/university UI KIT") {

            result = result.filter(function (obj) {
                console.log(obj);
                return obj.product_name.match("3D Character Mike back to school/university UI KIT")

            })

        } else if (props.product === "Cartoon Man And Woman Rigged") {

            result = result.filter(function (obj) {
                console.log(obj.product_name);
                return obj.product_name.match("Cartoon Man and Woman Rigged")


            })
        } else if (props.product === "ProductAll") {
            return result
        } else {
            console.log("No products selected or no matching product.");
        }


    } else if (props.platform === "CG") {

        result = CGTrader.filter(function (obj) {
            var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
            return date >= props.startDate && date <= props.endDate

        })
        // Filter by product name
        if (props.product === "3D Character Mike back to school/university UI KIT") {

            result = result.filter(function (obj) {
                return obj.product_name.match("3D Character Mike back to school/university UI KIT")

            })

        } else if (props.product === "Cartoon Man And Woman Rigged") {

            result = result.filter(function (obj) {
                return obj.product_name.match("Cartoon Man And Woman Rigged")


            })
        } else if (props.product === "ProductAll") {
            return result
        }

    } else if (props.platform === "BM") {


        result = BlenderMarket.filter(function (obj) {

            var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)), parseInt(obj.date.slice(0, 2)))
            return date >= props.startDate && date <= props.endDate


        })

        // Filter by product name
        if (props.product === "3D Character Mike back to school/university UI KIT") {

            result = result.filter(function (obj) {
                return obj.product_name.match("3D Character Mike back to school/university UI KIT")

            })

        } else if (props.product === "Cartoon Man And Woman Rigged") {

            result = result.filter(function (obj) {
                return obj.product_name.match("Cartoon Man And Woman Rigged")


            })
        }

    }


    // else if (props.platform === "All") {

    //     // How do we filter all data? It works, but seems to delete itself
    //     let allData = Object.assign(UI8, CGTrader, BlenderMarket)
    //     console.log(allData);


    //     var result = allData.filter(function (obj) {

    //         var date = new Date("20" + parseInt(obj.date.slice(-2)), parseInt(obj.date.slice(3, 5)) - 1, parseInt(obj.date.slice(0, 2)))
    //         return date >= props.startDate && date <= props.endDate


    //     })
    //     console.log(allData);


    // }

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

            {result.map((sale, i) => {

                return <p key={i}> {sale.sale}  {sale.date} {sale.product_name} {sale.revenue} </p>


            })}

        </div >
    )
}

