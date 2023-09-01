import React, { useEffect, useState } from "react";
import {convertVNDToUSDString, convertVNDtoVNDString} from '../ultils/convertMoney'
import CheckStars from "../ultils/starHelper";
import icons from "../ultils/icons";
import Options from "./Options";
const Product = ({ productData }) => {
    const { AiFillStar, AiOutlineStar } = icons;
    const [priceVND, setPriceVND] = useState(null);
    const [priceUSD, setPriceUSD] = useState(null);
    const [label, setLabel] = useState("");
    useEffect(() => {
        setPriceVND(convertVNDtoVNDString(productData.price));
        setPriceUSD(convertVNDToUSDString(productData.price,23000));
        setLabel(getRandomLabel());
    }, [productData.price]);

    const getRandomLabel = () => {
        const labels = [
            {
                name: "New",
                color: "bg-yellow-500",
            },
            {
                name: "Trending",
                color: "bg-red-500",
            },
            {
                name: null,
            },
        ];
        const randomIndex = Math.floor(Math.random() * labels.length);
        return labels[randomIndex];
    };

    return (
        <div className="h-[400px] product transition duration-2000 ease-in-out hover:shadow-2xl p-3 flex flex-col justify-between">
            <img
                src={productData.thumb}
                className="w-full object-contain"
                alt={productData.title}
            />
            <h3 className="hover:text-main">{productData.title}</h3>
            <div className="flex justify-between">
                <CheckStars number={productData?.totalRatings}/>
                <div className="font-light text-[14px]">Sold: {productData.sold}</div>
            </div>
            
            <div className="price">
                <h4 className="vndPrice">{priceVND}</h4>
                <h3 className="usdPrice">{priceUSD}</h3>
            </div>
            {label.name ? (
                <span className={`tag-wrap relative `}>
                    <span className={`tag ${label?.color} pl-2`}>
                        {label?.name}
                    </span>
                    <span className="w-[5px] h-[5px] block bg-white absolute rounded-full top-[10px] left-[7px] shadow-[inset_-2px_-2px_4px_#46464620]"></span>
                </span>
            ) : (
                ""
            )}
            <div className="option">
                <Options />
            </div>
        </div>
    );
};

export default Product;
