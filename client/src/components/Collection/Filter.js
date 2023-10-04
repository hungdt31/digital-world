import React from "react";
import icons from "../../ultils/icons";
import { useContext } from "react";
import { VariantContext } from "../../components/Collection/Context";
const Filter = (props) => {
    const context = useContext(VariantContext)
    const {price} = context
    const {RiDeleteBin5Fill} = icons
    return (
        <div className="flex items-center">
            {/* <p className="text-main font-semibold text-[13px]">
                {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </p> */}
            {props.name !== "price" && <div className="flex items-center">
                {props?.filter?.map((item) => {
                    return (
                        <button className="px-2 py-1 text-[13px] lowercase border-main border-[2px] text-main">
                            {item}
                        </button>
                    );
                })}
            </div>}
            {props.name === "price" && <div className="flex text-[13px] items-center">
                <RiDeleteBin5Fill onClick={()=>price.setState(null)} size={24}/>
                <div className=" px-2 py-1 flex">
                    <p className="">
                        {Number(props?.filter?.gte).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                    </p>
                    <p>{"-"}</p>
                    <p className="">
                        {Number(props?.filter?.lte).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                    </p>
                </div>
            </div>}
        </div>
    );
};

export default Filter;
