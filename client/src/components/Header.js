import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "../ultils/path";
import { apiGetCurrentUser } from "../apis/user";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const {
        BsFillTelephoneInboundFill,
        SlEnvolopeLetter,
        BsFillBagPlusFill,
        AiOutlineHeart,
        BiSolidUserCircle,
    } = icons;
    const [name, setName] = useState(null);
    const navigate = useNavigate();
    const handleStorageChange = async () => {
        try {
            const temp = JSON.parse(
                JSON.parse(window.localStorage.getItem("persist:shop/user"))
                    .token
            );
            var user;
            if (temp) {
                user = await apiGetCurrentUser(temp);
                if(user.data.mess.lastname)
                setName(
                    user.data.mess.firstname + " " + user.data.mess.lastname
                );
                // console.log(user);
            }
        } catch (error) {
            // navigate("/error", { state: { error: error.message } });
        }
    };
    useEffect(() => {
        handleStorageChange();
    }, []);
    return (
        <div className="w-3/4 border-bottom h-[110px] py-[35px] flex justify-between items-center">
            <Link to={`${path.HOME}`}>
                <img
                    src={logo}
                    alt="Logo"
                    className="w-[234px] object-contain"
                />
            </Link>
            <div className="flex text-[14px]">
                <div className="flex flex-col px-4">
                    <div className="flex gap-3 items-center">
                        <BsFillTelephoneInboundFill className="text-main" />
                        <span className="font-semibold">(+1800) 000 8808</span>
                    </div>
                    <span className="text-[13px]">Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col px-4">
                    <div className="flex gap-3 items-center">
                        <SlEnvolopeLetter className="text-main" />
                        <span className="uppercase font-semibold">
                            support@tadathemes.com
                        </span>
                    </div>
                    <span className="text-[13px]">Online Support 24/7</span>
                </div>
                <div className="px-4 flex items-center">
                    <AiOutlineHeart className="text-main" size={24} />
                </div>
                <div className="px-4 flex items-center gap-3">
                    <BsFillBagPlusFill size={24} className="text-main" />
                    <div className="hover:text-main cursor-pointer">0 item</div>
                    <div className="flex items-center">
                        <BiSolidUserCircle size={35} />
                        <div>
                            <p className="font-semibold">{name ? name : ""}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
