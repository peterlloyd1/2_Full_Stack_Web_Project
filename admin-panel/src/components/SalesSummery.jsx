import React from 'react'
import BlenderMarketData from "../sales_data/blendermarket_sales.json"

export default function SalesSummery() {
    let revenue = 0
    let asking_price = 0

    BlenderMarketData.map((sale) => {

        asking_price += parseInt(sale.asking_price.slice(1, -3))
        revenue += parseInt(sale.revenue.slice(1, -3))

        return null;
    })


    return (
        <div>
            <h1>Overall sales generate on BlenderMarket = {asking_price}</h1>
            <p>After fees: {revenue}</p>
        </div>
    )
}

