import React from "react";
import img from "../assets/slideshow3-home2_1920x.webp";
const Banner = () => {
    return (
        <div className="border-2">
            <img
                src={img}
                className="w-full object-fill h-[500px] saturate-150"
                alt="banner"
            />
        </div>
    );
};

export default Banner;
