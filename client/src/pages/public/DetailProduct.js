import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis/app";
import {
    convertVNDToUSDString,
    convertVNDtoVNDString,
} from "../../ultils/convertMoney";
import { obj } from "../../ultils/contants";
import CheckStars from "../../ultils/starHelper";
import TitleBanner from "../../components/TitleBanner";

const DetailProduct = () => {
    
    const params = useParams();
    const { pid, slug } = params;
    const [product, setProduct] = useState(null);
    const fn = async (pid) => {
        const response = await apiGetProduct(pid);
        console.log(response.data.productData);
        setProduct(response?.data?.productData);
    };
    useEffect(() => {
        fn(pid);
    }, []);
    return (
        <div className="w-full">
            <TitleBanner cateProduct={product?.category} titleProduct={product?.title}/>
            <div className="flex justify-center">
                <div className="w-3/4">
                    <div className="flex my-5 justify-between">
                        <div className="w-[40%]">
                            <img
                                src={product?.thumb}
                                className=" border-[1px] h-[500px]"
                            />
                            <div className="grid grid-cols-3 w-full mt-5 gap-3">
                                {product?.images.map((el) => {
                                    return (<div className="border-[1px]"><img src={el} className="object-contain"/></div>)
                                })}
                            </div>
                        </div>

                        <div className="px-5 flex flex-col gap-3">
                            <div className="price">
                                <div className="vndPrice cursor-pointer font-semibold text-[28px]">
                                    {convertVNDtoVNDString(product?.price)}
                                </div>
                                <div className="usdPrice2">
                                    {convertVNDToUSDString(
                                        product?.price,
                                        23000
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <CheckStars number={product?.totalRatings} />
                                <div>
                                    {product?.ratings.length}
                                    {" review"}
                                </div>
                            </div>
                            <div className="text-[14px] flex flex-col gap-2">
                                {product?.description.map((el) => {
                                    return (
                                        <li className="" id="square">
                                            {el}
                                        </li>
                                    );
                                })}
                            </div>
                            {product?.internal === null && <div>
                                <div className="flex gap-3 items-center">
                                    <div className="font-semibold">Internal</div>
                                    {product?.internal.map((el) => {
                                        return (
                                            <div className="border-[1px] p-2 text-slate-400">
                                                {el}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>}
                            {product?.ram  === null && <div>
                                <div className="flex gap-3 items-center">
                                    <div className="font-semibold">Ram</div>
                                    {product?.ram.map((el) => {
                                        return (
                                            <div className="border-[1px] p-2 text-slate-400">
                                                {el}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>}
                            <div>
                                <div className="flex gap-3 items-center">
                                    <div className="font-semibold">Color</div>
                                    {product?.color.map((el) => {
                                        return (
                                            <div className="border-[1px] p-2 text-slate-400">
                                                {el}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold">Quantity</div>
                            </div>
                            <div className="p-3 bg-main text-center text-white uppercase hover:bg-black cursor-pointer">
                                Add To Cart
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 ml-5">
                            {obj.map((el)=>{
                                return(
                                    <div className="border-[1px] p-3 w-[250px] flex items-center gap-3">
                                        <div className="text-[24px]">{el.icon}</div>
                                        <div>
                                        <div>{el.title}</div>
                                        <div className="text-slate-400 text-[12px]">{el.des}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
