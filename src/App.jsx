import Navbar from './components/Navbar'
import StatDisplay from './components/StatDisplay'
import Datasets from './components/Datasets'
import { useState } from 'react'
import './index.css'


export default function App() {
  const [username, setUsername] = useState('');
  const [urlUsername, setUrlUsername] = useState('')

  const setUrl = () => {
    setUrlUsername(username)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className=' flex flex-col items-center justify-center h-screen bg-white'>
      <label htmlFor="username" className='text-xl mb-3'>Enter Username:</label>
      <div>
      <input
          type='text'
          value={username}
          onChange={handleUsernameChange}
          className='border p-2 rounded-md mr-2'
          id='username'
        />
        <button
          onClick={() => setUrl()}
          className='bg-blue-500 text-white px-4 py-2 rounded-md mb-12'
        >Submit</button>
      </div>
        {(username || urlUsername) && <div className='bg-slate-300 rounded-[50px] drop-shadow-xl border-2'>
          <StatDisplay url={`https://www.leetcode.com/${urlUsername}`}/> 
        </div>}
    </div>
  )
}