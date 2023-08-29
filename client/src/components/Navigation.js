import React from "react";
import { navagation } from "../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="w-main h-[50px] py-2 border-y-2 text-[14px] flex items-center">
            {navagation.map((el) => (
                <NavLink to={el.path} key={el.id} className="pr-12 hover:text-main">
                    {el.value}
                </NavLink>
            ))}
        </div>
    );
};

export default Navigation;
