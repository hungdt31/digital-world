import React from 'react'
import icons from '../ultils/icons'
import path from '../ultils/path'
const TopHeader = () => {
    const {AiFillFacebook, AiFillGoogleCircle, BsInstagram, BsPinterest} = icons
    const icon = [
        <AiFillFacebook size={16} className='hover:text-slate-200 cursor-pointer'/>,
        <AiFillGoogleCircle size={16} className='hover:text-slate-200 cursor-pointer'/>,
        <BsInstagram size={16} className='hover:text-slate-200 cursor-pointer'/>,
        <BsPinterest size={16} className='hover:text-slate-200 cursor-pointer'/>
    ]
    return (
        <div className='bg-main w-full flex text-white text-[13px] py-3 justify-center'>
            <div className='w-3/4 flex justify-between'>
                <div className='flex'>
                    <div className='font-light border-r-2 pr-2'>ORDER ONLINE OR CALL US (+1800) 000 8808</div>
                    <div className='px-2'>VND</div>
                </div>
                <div className='flex items-center gap-3'>
                    <a href={path.LOGIN} className='hover:text-slate-200 cursor-pointer'>Sign In or Create Account</a>
                    {
                        icon?.map((el)=>{
                            return el
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TopHeader