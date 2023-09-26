import React, { useEffect, useState } from "react";
import { apiGetCategories } from "../apis";
const HotCollection = () => {
    const [col, setCol] = useState([]);
    const fn = async () => {
        try{
            const response = await apiGetCategories();
            console.log(response);
            const res = await response.data.productCategories.filter((el) => {return el.brand.length > 0})
            setCol(res);
        }
        catch(error){
            console.log(error.message)
        }
    };
    useEffect(() => {
        fn();
    }, []);
    return (
        <div>
            <div className="uppercase border-b-2 border-main py-3 font-semibold text-[20px]">
                Hot collections
            </div>
            <div className="grid grid-cols-3 gap-3 my-5">
                {col?.map((el) => {
                    return (
                        <div className="flex border-[1px] h-[250px] border-b-4 hover:border-[1px] hover:shadow-lg">
                            <img src={el.image} className="w-1/2 h-full scale-50" />
                            <div className="my-5">
                                <p className="uppercase font-semibold">{el.title}</p>
                                <div className="flex flex-col gap-1 my-3">
                                {
                                    el.brand?.map((item)=>{
                                        return(
                                            <div className="cursor-pointer hover:text-main text-[14px] text-[#666360]">
                                                {"> "}{item}
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HotCollection;
