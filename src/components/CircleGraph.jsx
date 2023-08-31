import React from "react"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Pie } from "react-chartjs-2"

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

function CircleGraph({userStats}) {

    const totalRemaining = (userStats[1] + userStats[4] + userStats[7]) - (userStats[0] + userStats[3] + userStats[6])

    const data = {
        labels: [],
        datasets: [
            {
                data: [userStats[0], userStats[3], userStats[6]],
                backgroundColor: ['green', 'yellow', 'red']
            }
        ]
    }

    const options = {

    }

    return (
        <div>
            <Pie
                data = {data}
                options = {options}
            >

            </Pie>
        </div>
    )
};

export default CircleGraph