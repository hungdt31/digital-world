import React from 'react'
import {Banner, Sidebar} from '../../components'
const Home = () => {
  return (
    <div className='w-main flex mt-7 gap-3'>
      <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
        <Sidebar/>
      </div>
      <div className='flex flex-col gap-5 w-[75%] flex-auto border'>
        <Banner/>
      </div>
    </div>
  )
}

export default Home