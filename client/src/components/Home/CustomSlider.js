import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { apiGetProducts } from "../../apis";
import ProductCard from "../ProductCard";

const CustomSlider = () => {
    const [slider, setSlider] = useState([]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    const fn = async () => {
        try {
            const response = await apiGetProducts({ category: "Smartphone" });
            console.log(response);
            setSlider(response.data.products);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        fn();
    }, []);
    return (
        <div>
            <div className="uppercase border-b-2 border-main py-3 font-semibold text-[20px]">
                New Smartphone
            </div>
            <Slider {...settings} className="my-5">
                {slider?.map((el) => {
                    return (
                        <ProductCard
                            _id={el._id}
                            slug={el.slug}
                            thumb={el.thumb}
                            title={el.title}
                            totalRatings={el.totalRatings}
                            price={el.price}
                            description={el.description}
                        />
                    );
                })}
            </Slider>
        </div>
    );
};

export default CustomSlider;
