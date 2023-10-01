import React, { useEffect, useState, memo } from "react";
import icons from "../../ultils/icons";
import { apiGetProducts } from "../../apis";
import CheckStars from "../../ultils/starHelper";
import {
    convertVNDToUSDString,
    convertVNDtoVNDString,
} from "../../ultils/convertMoney";
import CountDown from "../CountDown";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { secondsToHms } from "../../ultils/helper";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
const DailyDeals = () => {
    const navigate = useNavigate();
    const [deal, setDeal] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [hook, setHook] = useState(false);
    const fetchOneProduct = async () => {
        try {
            const response = await apiGetProducts({
                totalRatings: 5,
            });
            const randomNum = Math.round(
                Math.random() * (response.data.counts - 1)
            );
            if (response.data.success) {
                setDeal(response.data.products[`${randomNum}`]);
                const today = `${moment().format("MM/DD/YYYY")} 00:00:00`;
                console.log(new Date(today).getTime());
                const seconds =
                    new Date(today).getTime() -
                    new Date().getTime() +
                    24 * 3600 * 1000;
                const number = secondsToHms(seconds);
                setHour(number.h);
                setMinute(number.m);
                setSecond(number.s);
            }
            // console.log(response);
        } catch (error) {
            navigate("/error", { state: { error: error.message } });
        }
    };
    useEffect(() => {
        fetchOneProduct();
    }, [hook]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (second === 0) {
                setMinute((prev) => prev - 1);
                if (minute === 0) {
                    if (hour === 0) {
                        setHook((prev) => !prev);
                    } else {
                        setHour((prev) => prev - 1);
                        setMinute(59);
                    }
                }
                setSecond(59);
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
                <Link to={`/${path.DETAIL_PRODUCT}/${deal?._id}/${deal?.slug}`}>
                    <img src={deal?.thumb} className="mt-5" />
                </Link>
                <Link to={`/${path.DETAIL_PRODUCT}/${deal?._id}/${deal?.slug}`}>
                    <h2>{deal?.title}</h2>
                </Link>
                <CheckStars number={deal?.totalRatings} size={28} />
                <div className="price mt-3">
                    <h4 className="vndPrice">
                        {convertVNDtoVNDString(`${deal?.price}`)}
                    </h4>
                    <h3 className="usdPrice">
                        {convertVNDToUSDString(`${deal?.price}`, 23000)}
                    </h3>
                </div>
                <div className="flex justify-between gap-2 w-full">
                    <CountDown type="Hours" number={hour} />
                    <CountDown type="Minutes" number={minute} />
                    <CountDown type="Seconds" number={second} />
                </div>
                <Link
                to ={`${path.DETAIL_PRODUCT}/${deal?._id}/${deal?.slug}`}
                className="bg-main text-white w-full uppercase p-2 text-center flex items-center justify-center gap-2 hover:bg-red-400">
                    <FiAlignJustify />
                    <span >Options</span>
                </Link>
            </div>
        </div>
    );
};

export default memo(DailyDeals);
