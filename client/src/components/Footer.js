import React from "react";
import mailImg from "../assets/icon/SVG/Solid Icons/24 PX/Mail.svg";
import icons from "../ultils/icons";
import footerElement from "../ultils/footerElement";
import productTag from "../ultils/productTag";
const Footer = () => {
    const { MdEmail } = icons;
    return (
        <div className="w-full">
            <div className="bg-main w-full flex justify-center">
                <div className="justify-between w-3/4 my-4 lg:flex-row flex flex-col gap-3">
                    <div className="flex items-center">
                        <div>
                            <h1 className="uppercase text-[22px] text-white tracking-widest font-semibold">
                                Sign up to Newsletter
                            </h1>
                            <p className="text-slate-200 text-[14px]">
                                Subscribe now and receive weekly newsletter
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center lg:w-1/3">
                        <div className="relative w-full">
                            <input
                                className="bg-red-500 opacity-80 py-3 pl-5 pr-14 rounded-full w-full text-white focus:outline-none  placeholder:text-[#666360] placeholder:italic"
                                placeholder="someone@gmail.com"
                            />
                            <div className="absolute h-full w-[15%] top-0 flex justify-center items-center right-0 rounded-r-full">
                                <MdEmail
                                    size={20}
                                    className="hover:cursor-pointer h-[50%] text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#191919] text-white flex justify-center">
                <div className="w-3/4 py-9">
                    <div className="w-full lg:flex lg:gap-0 justify-between border-b-[1px] pb-4 border-main">
                        {footerElement.map((el) => {
                            return (
                                <div>
                                    <p className="border-l-[4px] border-main pl-3 uppercase font-semibold">
                                        {el.title}
                                    </p>
                                    <div className="flex flex-col gap-2 my-3">
                                        {el?.des?.map((item) => {
                                            return (
                                                <div className="text-[13px]">
                                                    <div className="flex items-center">
                                                        {item.icon}
                                                        <div className="mr-2 ml-1">
                                                            {item.first}
                                                        </div>
                                                        <div className=" text-slate-400 cursor-pointer">
                                                            {item.second}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="flex mb-3">
                                        {el?.icons?.map((Icon) => {
                                            return (
                                                <div className="p-3 mr-3 bg-gray-800 rounded-lg cursor-pointer">
                                                    {Icon}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-5">
                        <p className="border-l-[4px] border-main pl-3 uppercase font-semibold">
                            Product Tags
                        </p>
                        <div className="flex gap-3 mt-3 [&>*:last-child]:border-0 flex-wrap">
                            {productTag.map((el) => {
                                return (
                                    <p className="text-slate-400 text-[13px] border-r pr-3 border-slate-400 cursor-pointer">
                                        {el}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#0f0f0f] h-[80px] flex justify-center items-center text-slate-200">
                <div className="w-3/4">
                    <p>© 2023, Digital World 2 Powered by Shopify</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
