import React from "react";
import {
    convertVNDToUSDString,
    convertVNDtoVNDString,
} from "../ultils/convertMoney";

const DiscountPrice = ({ exist, discount, price }) => {
    const disCountPrice = (price * (100 - discount)) / 100;

    return (
        <div>
            {exist ? (
                <div className="flex gap-3">
                    <div className="price text-[13px]">
                        <h4 className="vndPrice cursor-pointer line-through text-slate-400">
                            {convertVNDtoVNDString(price)}
                        </h4>
                        <h3 className="usdPrice2">
                            {convertVNDToUSDString(price, 23000)}
                        </h3>
                    </div>
                    <div className="price text-[13px]">
                        <h4 className="vndPrice cursor-pointer">
                            {convertVNDtoVNDString(disCountPrice)}
                        </h4>
                        <h3 className="usdPrice2">
                            {convertVNDToUSDString(disCountPrice, 23000)}
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="price text-[13px]">
                    <h4 className="vndPrice cursor-pointer">
                        {convertVNDtoVNDString(price)}
                    </h4>
                    <h3 className="usdPrice2">
                        {convertVNDToUSDString(price, 23000)}
                    </h3>
                </div>
            )}
        </div>
    );
};

export default DiscountPrice;
