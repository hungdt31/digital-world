import React from 'react'
import {Banner, Sidebar, BestSeller} from '../../components'
import Collections from '../../components/Collections'
import DailyDeals from '../../components/DailyDeals'
const Home = () => {
  return (
    <div className='w-3/4 flex mt-7 gap-3'>
      <div className='flex flex-col gap-5 w-[25%] flex-auto'>
        <Sidebar/>
        <DailyDeals/>
      </div>
      <div className='flex flex-col gap-5 w-[75%] flex-auto'>
        <Banner/>
        <BestSeller/>
        <Collections/>
      </div>
    </div>
  )
}

export default Home