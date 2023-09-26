import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiGetProducts } from "../apis";
import CheckStars from "../ultils/starHelper";
import icons from "../ultils/icons";
import {
    convertVNDToUSDString,
    convertVNDtoVNDString,
} from "../ultils/convertMoney";
const CustomSlider = () => {
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
        },
        {
            icon: <FaEye />,
            text: "Quick Views",
        },
    ];
    const [slider, setSlider] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const fn = async () => {
        try{
            const response = await apiGetProducts({ category: "Smartphone" });
            console.log(response);
            setSlider(response.data.products);
        } catch(error){
            console.log(error.message)
        }
    };
    useEffect(() => {
        fn();
    }, []);
    return (
        <div>
            <div className="uppercase border-b-2 border-main py-3 font-semibold text-[20px]">
                New Smartphone
            </div>
            <Slider {...settings} className="my-5">
                {slider?.map((el) => {
                    return (
                        <div key={el._id} className="p-5 border-[1px] mr-3 customSlider">
                            <img src={el.thumb} />
                            <div className="flex flex-col gap-3 my-3">
                                <p>{el.title}</p>
                                <CheckStars number={el.totalRatings} />
                                <div className="price text-[15px]">
                                    <h4 className="vndPrice cursor-pointer">
                                        {convertVNDtoVNDString(el.price)}
                                    </h4>
                                </div>
                            </div>
                            <div className="customItem">
                                <div className="flex items-center border-b-2 justify-between p-3 font-semibold">
                                    <p>{el.title}</p>
                                    <div className="price text-[15px]">
                                        <h4 className="vndPrice cursor-pointer">
                                            {convertVNDtoVNDString(el.price)}
                                        </h4>
                                    </div>
                                </div>
                                <div className="p-3 text-[13px]">
                                    {el.description?.map((item) => {
                                        return <div key={item}>{item}</div>;
                                    })}
                                </div>
                                <div className="flex gap-3 justify-center iconCustom">
                                    {obj?.map((el) => {
                                        return (
                                            <div>
                                                <div
                                                    onMouseEnter={() => {
                                                        setText(el.text);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setText(null);
                                                    }}
                                                    className={`rounded-full border-[1px] p-3 cursor-pointer hover:text-white hover:bg-black flex justify-center items-center  ${text === el.text ? '' : 'animate-[widthChange_0.3s_ease-in-out]'}`}
                                                >
                                                    {el.icon}
                                                    {text === el.text ? (
                                                        <div className="text-[12px] animate-[slideRight_0.5s_ease-in-out] mx-3">
                                                            {el.text}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default CustomSlider;
