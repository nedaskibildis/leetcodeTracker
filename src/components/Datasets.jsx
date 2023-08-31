import { FolderIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState } from 'react';

function Datasets() {

    const [showDataset, setShowDataset] = React.useState(false);
    const [url, setUrl] = useState('')
    const addDataset = () => setShowDataset(!showDataset)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShowDataset(!showDataset)
        try {
            const response = await fetch('http://localhost:3000/datasets', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({url})
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (    
        <div className="flex flex-col h-full w-full">
            <h3 className="text-3xl my-3 font-bold text-center">Current Data Sets</h3>
            <ul className="flex flex-col space-y-4 mt-12">
               <a href=""> <li className="flex"><FolderIcon className="w-6 h-6 mx-3"/>LeetCode 75</li> </a>
                <div className="h-[2px] bg-gray-400 mx-3"></div>
               <a href=""> <li className="flex"><FolderIcon className="w-6 h-6 mx-3"/>30 Days Of Javascript</li> </a>
                <div className="h-[2px] bg-gray-400 mx-3"></div>
               <a href=""> <li className="flex"><FolderIcon className="w-6 h-6 mx-3"/>top 150 Interview Questions</li> </a>
               <div className="h-[2px] bg-gray-400 mx-3"></div>
            </ul>
            <div className="flex-grow"></div>
            <button onClick={addDataset} className="bg-gray-400 rounded-lg w-1/3 h-12 text-2xl text-white font-bold m-4 self-center">Add New Data Set</button>
            { showDataset ? 
            <div className="bg-indigo-700 h-1/4 absolute w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border-4 border-gray-400">
                <form className="flex flex-col items-center h-full justify-evenly" onSubmit={handleSubmit}>
                    <button className="absolute top-0 right-0 mx-8 mt-4 text-white" onClick={addDataset}>X</button>
                    <label htmlFor="url" className="text-white text-xl">Enter Dataset URL</label> 
                    <input type="text" name="url" id="url" className="rounded-lg border-2 border-black w-1/2" placeholder=" url" onChange={(e) => setUrl(e.target.value)}/>
                    <button className="rounded-lg bg-gray-200 text-xs w-24 h-8">Submit</button>
                </form>
            </div> 
            : null }
        </div>
    )
}

export default Datasets