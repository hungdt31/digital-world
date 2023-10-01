import React, { useEffect, useState } from "react";
import CheckStars from "../../ultils/starHelper";
import { apiGetProducts } from "../../apis";
import DiscountPrice from "../DiscountPrice";
import { banner1, banner2, banner3, banner4 } from "../../assets";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
const FeaturedProduct = () => {
    const [products, setProducts] = useState([]);
    const fProduct = async () => {
        try{
            const res = await apiGetProducts({
                page: 6,
                limit: 9,
            });
            setProducts(res.data.products);
        }
        catch(error){
            console.log(error.message)
        }
    };
    useEffect(() => {
        fProduct();
    }, []);
    const discountNumber = () => {
        return Math.round(Math.random() * 35 + 5)
    }
    const setExist = () => {
        const arr = [ true, false, true, false]
        const temp = Math.round(Math.random() * 3)
        return arr[temp]
    }
    return (
        <div className="">
            <div className="uppercase border-b-2 border-main py-3 font-semibold text-[20px]">
                Featured Product
            </div>
            <div className="grid grid-cols-3 gap-4 my-4">
                {products?.map((el) => {
                    return (
                        <Link to={`/${path.DETAIL_PRODUCT}/${el._id}/${el.slug}`}>
                        <div className="flex border-[1px] border-slate-200 p-3 items-center gap-3">
                            <img
                                src={el.thumb}
                                alt={"feature item"}
                                className="w-1/3"
                            />
                            <div className="gap-3 flex flex-col">
                                <div className="hover:text-main cursor-pointer">{el.title}</div>
                                <CheckStars number={el.totalRatings} />
                                <DiscountPrice price={el.price} exist={setExist()} discount={discountNumber()}/>
                            </div>
                        </div>
                        </Link>
                    );
                })}
            </div>
            <div className="flex justify-between mb-4">
                <div className="collection w-[49%] object-cover">
                    <img src={banner1} className="object-cover h-[100%]"/>
                </div>
                <div className="flex flex-col justify-between w-[24%]">
                    <div className="collection">
                        <img src={banner2} className="collection h-[100%] w-full"/>
                    </div>
                    <div className="collection">
                        <img src={banner3} className="collection h-[100%] w-full"/>
                    </div>
                </div>
                <div className="collection w-[24%]">
                    <img src={banner4}/>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;
