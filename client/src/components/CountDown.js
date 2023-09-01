import React from 'react'

const CountDown = ({type, number}) => {
    return (
        <div className='bg-slate-200 p-3 flex flex-col items-center w-1/3'>
            <p className='font-semibold'>{number}</p>
            <p className='font-light text-[12px]'>{type}</p>
        </div>
    )
}

export default CountDown