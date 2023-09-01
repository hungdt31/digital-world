import React from 'react'
import img1 from '../assets/banner1-home2_2000x_crop_center.avif'
import img2 from '../assets/banner2-home2_2000x_crop_center.avif'

const Collections = () => {
    return (
        <div className='flex gap-5 py-5'>
            <div className='collection'>
                <img src={img1} className='cursor-pointer'/>
            </div>
            <div className='collection'>
                <img src={img2} className='cursor-pointer'/>
            </div>
        </div>
    )
}
export default Collections