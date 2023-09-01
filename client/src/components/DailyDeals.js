import React, { useEffect, useState, memo } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis";
import CheckStars from "../ultils/starHelper";
import {
    convertVNDToUSDString,
    convertVNDtoVNDString,
} from "../ultils/convertMoney";
import CountDown from "./CountDown";

const DailyDeals = () => {
    const [deal, setDeal] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(20);
    const [hook, setHook] = useState(false);
    const fetchOneProduct = async () => {
        
        const response = await apiGetProducts({
            totalRatings: 5
        });
        const randomNum = Math.round(Math.random() * (response.data.counts - 1))
        if(response.data.success){
            setDeal(response.data.products[`${randomNum}`]);
        }
        console.log(response)
    };
    useEffect(() => {
        fetchOneProduct();
        setHour(0)
        setMinute(0)
        setSecond(20)
    }, [hook]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (second === 0) {
                setMinute((prev) => prev - 1);
                if(minute === 0){
                    if(hour === 0){
                        setHook(prev => !prev)
                    }
                    else{
                        setHour(prev => prev - 1)
                        setMinute(0)
                    }
                }
                setSecond(0);
            } else {
                setSecond((prev) => prev - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [second, minute, hour]);
    const { MdOutlineViewDay, FiAlignJustify } = icons;
    return (
        <div className="border p-5">
            <div className="flex items-center justify-around ">
                <MdOutlineViewDay size={25} className="text-main" />
                <h1 className="uppercase font-semibold text-[20px]">
                    Daily Deals
                </h1>
                <span></span>
            </div>
            <div className="flex flex-col items-center gap-3">
                <img src={deal?.thumb} />
                <h2>{deal?.title}</h2>
                <CheckStars number={deal?.totalRatings} />
                <p>{convertVNDtoVNDString(`${deal?.price}`)}</p>
                <div className="flex justify-between gap-2 w-full">
                    <CountDown type="Hours" number={hour} />
                    <CountDown type="Minutes" number={minute} />
                    <CountDown type="Seconds" number={second} />
                </div>
                <button className="bg-main text-white w-full uppercase p-2 text-center flex items-center justify-center gap-2">
                    <FiAlignJustify />
                    <span>Options</span>
                </button>
            </div>
        </div>
    );
};

export default memo(DailyDeals);
