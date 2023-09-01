import React, { useEffect, useState, useRef } from "react";
import { apiGetProducts } from "../apis/index";
import Slider from "react-slick";
import Product from "./Product";
import ErrorPage from "../pages/public/ErrorPage";
import { useNavigate } from "react-router-dom";
const BestSeller = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrow: true
    };
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [tablet, setTablet] = useState(null);
    const [checked, setChecked] = useState(1);
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
    const fetchProduct = async () => {
        try{
            const response = await Promise.all([
                apiGetProducts({ sort: "-sold" }),
                apiGetProducts({ sort: "-createdAt" }),
                apiGetProducts({ category: "Tablet" })
            ]);
            if (response[0].data.success) {
                setBestSellers(response[0].data.products);
                setContent(response[0].data.products);
            }
            if (response[1].data.success) setNewProducts(response[1].data.products);
            if (response[2].data.success) setTablet(response[2].data.products);
        }
        catch(error){
            navigate('/error',{state:{error: error.message}});
        }
    };

    useEffect(() => {
        fetchProduct();

        // Create an interval to automatically click the "Next" button of the Slider
        const interval = setInterval(() => {
            if (sliderRef.current) {
                sliderRef.current.slickNext();
            }
        }, 6000);

        // Clear the interval when the component is unmounted
        return () => {
            clearInterval(interval);
        };
    }, []);

    const feature = [
        {
            title: "BEST SELLER",
            id: 1,
            content: bestSellers
        },
        {
            title: "NEW ARRIVALS",
            id: 2,
            content: newProducts
        },
        {
            title: "TABLET",
            id: 3,
            content: tablet
        },
    ];

    // Ref to access the Slider component
    const sliderRef = useRef();

    return (
        <div>
            <div className="flex border-b-2 border-b-main pb-2 [&>*:nth-child(1)]:pl-0 [&>*:nth-child(3)]:border-0">
                {feature.map((el) => {
                    return (
                        <div
                            key={el.id}
                            className={
                                checked === el.id
                                    ? `font-medium text-[20px] text-main cursor-pointer border-r-2 px-5`
                                    : `border-r-2 px-5 font-medium text-[20px] text-slate-400 cursor-pointer`
                            }
                            onClick={() => {
                                setContent(el.content);
                                setChecked(el.id);
                            }}
                        >
                            {el.title}
                        </div>
                    );
                })}
            </div>
            <div>
                <div>
                    <Slider ref={sliderRef} {...settings}>
                        {content?.map((el) => {
                            return (
                                <Product
                                    key={el._id}
                                    productData={el}
                                />
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BestSeller;
