import React from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";

const Header = () => {
    const {
        BsFillTelephoneInboundFill,
        SlEnvolopeLetter,
        BsFillBagHeartFill,
        AiOutlineHeart,
        BiSolidUserCircle,
    } = icons;
    return (
        <div className="border-bottom w-main h-[110px] py-[35px] flex justify-between items-center">
            <Link to={`${path.HOME}`}>
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[234px] object-contain"
                />
            </Link>
            <div className="flex text-[14px]">
                <div className="flex flex-col border-r-2 px-4">
                    <div className="flex gap-3 items-center">
                        <BsFillTelephoneInboundFill className="text-main" />
                        <span className="font-semibold">(+1800) 000 8808</span>
                    </div>
                    <span className="text-[13px]">Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col border-r-2 px-4">
                    <div className="flex gap-3 items-center">
                        <SlEnvolopeLetter className="text-main" />
                        <span className="uppercase font-semibold">
                            support@tadathemes.com
                        </span>
                    </div>
                    <span className="text-[13px]">Online Support 24/7</span>
                </div>
                <div className="px-4 flex items-center border-r-2">
                    <AiOutlineHeart className="text-main" size={24} />
                </div>
                <div className="px-4 flex items-center gap-2">
                    <BsFillBagHeartFill size={24} className="text-main" />
                    <div className="hover:text-main cursor-pointer">0 item</div>
                    <BiSolidUserCircle size={30} className="ml-2" />
                </div>
            </div>
        </div>
    );
};

export default Header;
