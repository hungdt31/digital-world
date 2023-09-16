import React from "react";
import { navagation } from "../ultils/contants";
import { NavLink } from "react-router-dom";
import 'react-dropdown/style.css';

const Navigation = () => {
    return (
        <div className="w-3/4 h-[50px] py-2 border-y-[1px] text-[15px] flex justify-between">
            <div className="flex items-center">
                {navagation.map((el) => (
                    <NavLink
                    to={el.path} key={el.id} className={({isActive, isPending})=> isPending ? "pr-12 font-medium" : isActive ? "pr-12 text-main font-medium":"pr-12 font-medium"}>
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
