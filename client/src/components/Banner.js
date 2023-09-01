import React, { Fragment } from "react";
import img from "../assets/slideshow3-home2_1920x.webp";
const Banner = () => {
    return (
        <div className="border-2 relative frame">
            <img
                src={img}
                className="w-full object-fill h-[500px] img-banner "
                alt="banner"
            />
            <div className="flex h-full w-full absolute top-0 justify-center items-center text-center">
                <div className="">
                    <div className="text-white uppercase text-[30px] font-bold mb-2 text-banner1">Meilleures marques</div>
                    <div className="text-white text-[20px] mb-7 text-banner2">Bienvenue dans notre magasin</div>
                    <button className=" text-white border-2 p-3 opacity-80 text-banner3">&#10093;&#10093; Read more</button>
                </div>
            </div>
            
        </div>
    );
};

export default Banner;
