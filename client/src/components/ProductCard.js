import React from "react";
import CheckStars from "../ultils/starHelper";
import icons from "../ultils/icons";
import {
    convertVNDToUSDString,
    convertVNDtoVNDString,
} from "../ultils/convertMoney";
import { useState } from "react";
import path from "../ultils/path"
import {Link} from "react-router-dom"
const ProductCard = (props) => {
    const [text, setText] = useState(false);
    const { AiFillHeart, AiOutlineAlignLeft, FaEye } = icons;
    const obj = [
        {
            icon: <AiFillHeart />,
            text: "Add to Wishlist",
        },
        {
            icon: <AiOutlineAlignLeft />,
            text: "Select Options",
            link:`/${path.DETAIL_PRODUCT}/${props._id}/${props.slug}`
        },
        {
            icon: <FaEye />,
            text: "Quick Views",
        },
    ];
    return (
        <div key={props._id} className="p-5 border-[1px] customSlider">
            <img src={props.thumb} />
            <div className="flex flex-col gap-3 my-3">
                <p>{props.title}</p>
                <CheckStars number={props.totalRatings} />
                <div className="price text-[15px]">
                    <h4 className="vndPrice cursor-pointer">
                        {convertVNDtoVNDString(props.price)}
                    </h4>
                </div>
            </div>
            <div className="customItem">
                <div className="flex items-center border-b-2 justify-between p-3 font-semibold">
                    <p>{props.title}</p>
                    <div className="price text-[15px]">
                        <h4 className="vndPrice cursor-pointer">
                            {convertVNDtoVNDString(props.price)}
                        </h4>
                        <h4 className="usdPrice2 cursor-pointer">
                            {convertVNDToUSDString(props.price,23000)}
                        </h4>
                    </div>
                </div>
                <div className="p-3 text-[13px]">
                    {props.description?.map((item) => {
                        return <div key={item}>{item}</div>;
                    })}
                </div>
                <div className="flex gap-3 justify-center iconCustom">
                    {obj?.map((el) => {
                        return (
                            <div>
                                <Link
                                    onMouseEnter={() => {
                                        setText(el.text);
                                    }}
                                    onMouseLeave={() => {
                                        setText(null);
                                    }}
                                    className={`rounded-full border-[1px] p-3 cursor-pointer hover:text-white hover:bg-black flex justify-center items-center  ${
                                        text === el.text
                                            ? ""
                                            : "animate-[widthChange_0.3s_ease-in-out]"
                                    }`}
                                    to={el.link}
                                >
                                    {el.icon}
                                    {text === el.text ? (
                                        <div className="text-[12px] animate-[slideRight_0.5s_ease-in-out] mx-3">
                                            {el.text}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
