import React from "react";
import { navagation } from "../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="w-3/4 h-[50px] py-2 border-y-2 text-[14px] flex justify-between">
            <div className="flex items-center">
                {navagation.map((el) => (
                    <NavLink to={el.path} key={el.id} className="pr-12 hover:text-main">
                        {el.value}
                    </NavLink>
                ))}
            </div>
            <div className="flex items-center">   
                <input placeholder="Search something" className="focus:outline-none focus:ring-1 focus:ring-white placeholder-slate-400 "/>
                <input type="checkbox" className="accent-main"/>
            </div>
        </div>
    );
};

export default Navigation;
