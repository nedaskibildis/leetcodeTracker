import React, { useEffect, useState } from 'react';
import axios from 'axios'
import cheerio from 'cheerio'
import CircleGraph from './CircleGraph'

const StatDisplay = ({url}) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post('http://localhost:3000/proxy', {url})
                setUserData(result.data)
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [url])

    const getUsername = (url) => {
        const regex = /\/([^/]+)$/
        const match = url.match(regex)
        return match[1]
    }

    return (
        <div className='flex h-full w-full items-center justify-evenly'>
            {userData && (
            <div className='flex flex-col space-y-4 p-12'>
                <h1 className='text-3xl font-bold text-black'>{getUsername(url)} LeetCode Stats</h1>
                    <h3 className='text-xl font-bold text-white'>Total Problems Solved: {userData.problemsSolved}</h3>
                    <h3 className='text-xl font-bold text-white'>Easy Problems Solved: <span className='text-green-500'>{userData.eachSolved[0]} / {userData.eachSolved[1]}</span></h3>
                    <h3 className='text-xl font-bold text-white'>Medium Problems Solved: <span className='text-yellow-500'>{userData.eachSolved[3]} / {userData.eachSolved[4]}</span></h3>
                    <h3 className='text-xl font-bold text-white'>Hard Problems Solved: <span className='text-red-600'>{userData.eachSolved[6]} / {userData.eachSolved[7]}</span></h3>
                </div>
                )}
            {userData && (
            <div className='flex items-center justify-center m-4'>
                <CircleGraph userStats={userData.eachSolved}/>
            </div>
            )}
        </div>
    )
}

export default StatDisplay;