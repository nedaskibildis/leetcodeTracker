// Import Node Modules
import express from 'express'
import axios from 'axios'
import cheerio from 'cheerio'
import cors from 'cors'
import mongoose from 'mongoose'

// Require Mongoose Models
import User from './src/models/user.js'
import Problem from './src/models/problem.js'
import Dataset from './src/models/dataset.js'

// Define and connect to data base
const dbUrl = "mongodb://localhost:27017/leet-tracker"
mongoose.connect(dbUrl)

// Define Port and define app
const PORT = 3000
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

app.post('/proxy', async (req, res) => {
    const { url } = req.body;
    try {
        const data = await axios.get(url);
        const $ = cheerio.load(data.data);
        const problemsSolved = getProblemsSolved($);
        const eachSolved = getEachSolved($);
        const userInfo = getUserInfo($);
        const returnData =  {
            problemsSolved,
            eachSolved,
            userInfo
        };
        res.json(returnData)
    } catch (error) {
        console.error('Rah');
        res.status(500).json({error: 'An error occured while proxying the request'})
    }
})

app.post('/datasets', async(req, res) => {
    const { url } = req.body
    try {
        const data = await axios.get(url)
        const $ = cheerio.load(data.data);
        const title = getDatasetTitle($)
        getCategories($)

    } catch(error) {
        console.error('Error')
    }
})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})

function getProblemsSolved($) {
        const numSolved = $(".text-[24px], .font-medium, .text-label-1")
                .parent(":not([class])")
                .parent(".absolute, .top-1/2, .left-1/2, .-translate-x-1/2, .-translate-y-1/2, .transform.cursor-default, .text-center");
            const string = numSolved.text()
            const myRe = /\d+/
            const match = myRe.exec(string)
            return match[0]
    }

    function getEachSolved($) {
        const easySolved = $(".flex flex-1, .items-center")
            .parent(".flex, .w-full, .items-end, .text-xs")
            .parent('.space-y-2')
        const numbers = easySolved.text().match(/\d+(\.\d+)?/g);
        if (numbers[8] == null) {
            numbers.push('0')
        }
        
        return numbers
    }

    function getUserInfo($) {        
        const userRank = $(".flex, .flex-1, .items-end, .space-x-[5px], .text-base")
            .parent(".flex, .flex-col")
            .parent('.relative, .flex, .h-20, .w-20, shrink-0')
            .parent('.flex, .space-x-4')
            .parent('.text-lavel-2, .flex, .flex-col, .space-y-4')
            .parent('.bg-layer-1, .rounded-lg, .flex, .w-full, .min-w-[300px], .flex-col, .px-4, .pt-[21px]')
        
        const rank = userRank.text().match(/(?<=Rank)[\d,]+/)

        return rank[0]
    }

    function scrapeData(url) {
        return axios.get(url)
        .then((res) => {
            
        })
        .catch((err) => {
            return null;
        });   
    }
