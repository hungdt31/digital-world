import React, { useState } from "react";
import icons from "../ultils/icons";

const Options = () => {
    const { AiFillHeart, AiOutlineAlignLeft, FaEye } = icons;
    const obj = [
        {
            icon: <AiFillHeart />,
            text: 'Add to Wishlist'
        },
        {
            icon: <AiOutlineAlignLeft />,
            text: 'Select Options'
        },
        {
            icon: <FaEye />,
            text: 'Quick Views'
        }
    ];

    const [hoveredText, setHoveredText] = useState(null);

    return (
        <div className="absolute flex gap-7 top-3 flex-col left-3">
            {
                obj.map((el, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredText(el.text)}
                        onMouseLeave={() => setHoveredText(null)}
                    >
                        <div className="bounce-once bg-white border border-black rounded-full flex justify-center items-center w-[40px] h-[40px] hover:bg-slate-400 hover:text-white cursor-pointer">
                            {el.icon}
                        </div>
                        {hoveredText === el.text && (
                            <p className="absolute top-0 w-[150px] block border px-3 py-2 left-11 bg-slate-400 text-white opacity-80 option-label">{el.text}</p>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default Options;
