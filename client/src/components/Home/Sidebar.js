import React, { useEffect, useState, memo } from "react";
import { slugify } from "../../ultils/helper";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/products/asyncAction";
// import { print } from "../store/products/sidebarSlice";
import { apiGetProducts } from "../../apis";
import icons from "../../ultils/icons";
import path from '../../ultils/path'
const Sidebar = () => {
    const { FiAlignJustify } = icons;
    const dispatch = useDispatch();
    const stateCategories = useSelector((state) => state.SideBar);
    const [updateCate, setUpdateCate] = useState([]); // Use state to manage the category updates

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (stateCategories.categories && stateCategories.categories.length > 0) {
            const promises = stateCategories.categories.map(async (cate) => {
                const response = await apiGetProducts({ category: cate.title });
                const count = response.data.counts;
                const updatedCategory = { ...cate, count }; // Create a new object with the count property
                setUpdateCate((prevUpdateCate) => {
                    const updatedCateList = prevUpdateCate.filter(
                        (item) => item.title !== updatedCategory.title
                    );
                    return [...updatedCateList, updatedCategory];
                });
            });
            Promise.all(promises)
        }
    }, [stateCategories]);

    return (
        <div className="flex flex-col border">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm uppercase flex items-center gap-3"
                        : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main flex items-center gap-3"
                }
            >
                <FiAlignJustify />
                All collection
            </NavLink>
            {updateCate?.map((el) => {
                return (
                    <div
                        className="flex items-center ml-5 last-of-type:pb-[8.5px]"
                        key={slugify(el.title)}
                    >
                        <img src={el.icon} className="w-[20px] h-[20px]" alt={el.title} />
                        <NavLink
                            key={slugify(el.title)}
                            className={({ isActive }) =>
                                isActive
                                    ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm"
                                    : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
                            }
                            to={`${path.COLLECTIONS}/${slugify(el.title)}`}
                        >
                            {el.title} ({el.count})
                        </NavLink>
                    </div>
                );
            })}
        </div>
    );
};

export default memo(Sidebar);
