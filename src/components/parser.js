const axios = require('axios')
const cheerio = require('cheerio')

    function getProblemsSolved($) {
        const numSolved = $(".text-[24px], .font-medium, .text-label-1")
                .parent(":not([class])")
                .parent(".absolute, .top-1/2, .left-1/2, .-translate-x-1/2, .-translate-y-1/2, .transform.cursor-default, .text-center");
            const string = numSolved.text()
            const myRe = /\d+/
            const match = myRe.exec(string)
            return match[0]
    }
    // <div class="flex flex-1 items-center"><span class="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1">41</span><span class="text-xs font-medium text-label-4 dark:text-dark-label-4">/709</span></div>

    function getEachSolved($) {
        const easySolved = $(".flex flex-1, .items-center")
            .parent(".flex, .w-full, .items-end, .text-xs")
            .parent('.space-y-2')
        // const myRe = /\d+(\.\d+)?/
        // const match = myRe.exec(easySolved.text())
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

    export default function scrapeData(url) {
        return axios.get(url)
        .then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);
            const problemsSolved = getProblemsSolved($);
            const eachSolved = getEachSolved($);
            const userInfo = getUserInfo($);
            return {
                problemsSolved,
                eachSolved,
                userInfo
            };
        })
        .catch((err) => {
            return null;
        });   
    }

    module.exports [
        scrapeData
    ]