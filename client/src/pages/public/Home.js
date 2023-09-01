import React from 'react'
import {Banner, Sidebar, BestSeller} from '../../components'
import Collections from '../../components/Collections'
import {DailyDeals} from '../../components'
const Home = () => {
  return (
    <div className='w-3/4 flex mt-7 gap-3'>
      <div className='flex flex-col gap-5 w-[28%] flex-auto'>
        <Sidebar/>
        <DailyDeals/>
      </div>
      <div className='flex flex-col gap-5 w-[72%] flex-auto'>
        <Banner/>
        <BestSeller/>
        <Collections/>
      </div>
    </div>
  )
}

export default Home