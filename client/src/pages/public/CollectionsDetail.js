import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleBanner from "../../components/TitleBanner";
import DropDown from "../../components/Collection/DropDown";
import { apiGetProducts } from "../../apis/app";
import ProductCard from "../../components/ProductCard";
import Variants from "../../components/Collection/Variants";
import { useContext } from "react";
import Filter from "../../components/Collection/Filter";
import { VariantContext } from "../../components/Collection/Context";
import Sort from "../../components/Collection/Sort";
export const CollectionsDetail = () => {
    const params = useParams();
    const context = useContext(VariantContext);
    const { capacity, color, internal, ram, size, price, sort, page } = context;
    const temp = [capacity, color, internal, ram, size, price];
    const { category } = params;
    const [products, setProducts] = useState(null);
    const [count, setCount] = useState(0);
    const [divArray, setDivArray] = useState([])
    const fetchData = async () => {
        try {
            const rs = await apiGetProducts({
                fields: "title,description,price,thumb,totalRatings,ram,color,internal,capacity,size,slug",
                category:  category === "products" ? null : category[0]?.toUpperCase() + category?.slice(1),
                ram: ram.state,
                size: size.state,
                capacity: capacity.state,
                color: color.state,
                internal: internal.state,
                price: price.state,
                sort: sort.state,
                limit : category !== "products" ? 9 : 12,
                page:page.state
            });
            // console.log(rs.data.products);
            setProducts(rs?.data?.products);
            if(rs?.data?.counts % 12 == 0 && rs?.data?.counts !== 0){
                setCount(rs?.data?.counts/12)
            }
            else{
                setCount(Math.floor(rs?.data?.counts/12 + 1))
            }
            setDivArray([])
            for(let i = 1; i <= count; i++)
            setDivArray(prev => [...prev,<div className={`font-semibold text-[15px] cursor-pointer ${i === page.state ? 'text-main':''}`} onClick={()=>{page.setState(i)}}>{i}</div>])
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [page,price,ram,size,capacity,internal,color,count,params]);
    console.log(count)
    return (
        <div className="w-full">
            <TitleBanner
                category={category.charAt(0).toUpperCase() + category.slice(1)}
            />
            <div className="flex justify-center">
                <div className="w-3/4 mt-7">
                    <div className="border-[1px] shadow-sm pb-7 pt-3 px-5">
                        <div className="flex items-center w-full justify-between">
                            <div className="">
                                <p className="text-[14px] font-semibold">
                                    Filter By
                                </p>
                                <Variants />
                            </div>
                            <div className="">
                                <p className="text-[14px] font-semibold">
                                    Sort By
                                </p>
                                <Sort />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-9 py-5 px-3">
                            {price.state && (
                                <Filter name="price" filter={price.state} />
                            )}

                            {color.state.length > 0 && (
                                <Filter name="color" filter={color.state} />
                            )}
                            {size.state.length > 0 && (
                                <Filter name="size" filter={size.state} />
                            )}
                            {internal.state.length > 0 && (
                                <Filter
                                    name="internal"
                                    filter={internal.state}
                                />
                            )}
                            {ram.state.length > 0 && (
                                <Filter name="ram" filter={ram.state} />
                            )}
                            {capacity.state.length > 0 && (
                                <Filter
                                    name="capacity"
                                    filter={capacity.state}
                                />
                            )}
                        </div>
                        {(color.state.length > 0 ||
                        price.state !== null ||
                            capacity.state.length > 0 ||
                            internal.state.length > 0 ||
                            ram.state.length > 0 ||
                            size.state.length > 0) && (
                            <button
                                onClick={() => {
                                    temp?.map((el) => {
                                        if (el == price) el.setState(null);
                                        else el.setState([]);
                                    });
                                }}
                                className="bg-main text-white w-[10%] px-3 py-1 rounded-sm text-center"
                            >
                                Reset ALL
                            </button>
                        )}
                    </div>
                    <div
                        className={`grid lg:grid-cols-4 sm:grid-cols-2 gap-4 my-5 ${
                            sort.state === "-sold"
                                ? "[&>*:first-child]:text-blue-600"
                                : ""
                        }`}
                    >
                        {products?.map((el) => (
                            <ProductCard
                                key={el._id}
                                _id={el._id}
                                slug={el.slug}
                                thumb={el.thumb}
                                title={el.title}
                                totalRatings={el.totalRatings}
                                price={el.price}
                                description={el.description}
                            />
                        ))}
                    </div>
                    {category === "products" && 
                    <div className="flex justify-center"><div className="w-1/4 flex justify-around items-center">
                        <button className="text-[40px]" onClick={()=>{page.setState((prev)=>prev > 1 ? prev-1 : prev)}}>{"<"}</button>
                        {divArray.map((el)=>{
                            return el
                        })}
                        <button className="text-[40px]" onClick={() =>{page.setState((prev)=>prev >= count ? prev : prev + 1 )}}>{">"}</button>
                    </div>
                    </div>}
                </div>
            </div>
        </div>
    );
};
