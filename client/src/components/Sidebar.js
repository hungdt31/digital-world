import React, { useEffect, useState } from "react";
import { slugify } from "../ultils/helper";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/asyncAction";
import { print } from "../store/sidebarSlice";
const Sidebar = () => {
    const dispatch = useDispatch();
    const stateCategories = useSelector(state => state.SideBar)
    useEffect(() => {
        dispatch(getCategories())
    }, []);
    // console.log(stateCategories)
    return (
        <div className="flex flex-col">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm"
                        : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
                }
            >
                All collection
            </NavLink>
            {stateCategories?.categories?.map((el) => {
                return (
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm"
                                : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
                        }
                        key={slugify(el.title)}
                        to={slugify(el.title)}
                    >
                        {el.title}
                    </NavLink>
                );
            })}
        </div>
    );
};

export default Sidebar;
