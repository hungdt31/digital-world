import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import DropDown from "../../components/Collection/DropDown";
import { apiGetProducts } from "../../apis/app";
import PriceDropDown from "../../components/Collection/PriceDropDown";
import { VariantContext } from "../../components/Collection/Context";
const Variants = () => {
    const params = useParams();
    const context = useContext(VariantContext);
    
    const {
        capacity,
        color,
        internal,
        ram,
        size
    } = context;
    const [maxPrice, setMaxPrice] = useState(null);
    const [variants, setVariants] = useState([]);
    const { category } = params;
    const [products, setProducts] = useState(null);
    const fields = [
        {
            name: "capacity",
            setState: capacity.setState,
            state:capacity.state
        },
        {
            name: "color",
            setState: color.setState,
            state:color.state
        },
        {
            name: "internal",
            setState: internal.setState,
            state:internal.state
        },
        {
            name: "ram",
            setState: ram.setState,
            state:ram.state
        },
        {
            name: "size",
            setState: size.setState,
            state:size.state
        },
    ];

    const addVariant = (action) => {
        const { name, array, setState, state } = action;
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            const existingVariant = updatedVariants.find((e) => e.name === name);

            if (existingVariant) {
                for (let i of array) {
                    let found = false;
                    for (let u of existingVariant.array) {
                        if (u.value === i) {
                            u.count += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        existingVariant.array.push({
                            value: i,
                            count: 1,
                        });
                    }
                }
            } else {
                updatedVariants.push({
                    name,
                    array: array?.map((item) => ({
                        value: item,
                        count: 1,
                    })),
                    setState
                });
            }
            return updatedVariants;
        });
    };

    const fetchData = async () => {
        try {
            const rs = await apiGetProducts({
                fields: "title,description,price,thumb,totalRatings,ram,color,internal,capacity,size,slug",
                category: category[0].toUpperCase() + category.slice(1),
            });
            console.log(rs.data.products);
            setProducts(rs?.data?.products);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let index = 0;
        if (products) {
            let maxPriceValue = 0; // Khởi tạo giá trị lớn nhất

            for (let product of products) {
                const productPrice = Number(product?.price);

                if (index === 0) {
                    maxPriceValue = productPrice; // Đặt giá trị lớn nhất ban đầu
                } else {
                    if (productPrice > maxPriceValue) {
                        maxPriceValue = productPrice; // Cập nhật giá trị lớn nhất nếu tìm thấy giá mới lớn hơn
                    }
                }

                for (let j of fields) {
                    const k = j.name;
                    if (product[k].length > 0) {
                        addVariant({
                            name: k,
                            array: product[k],
                            setState: j.setState
                        });
                    }
                }
                index++;
            }

            // Cập nhật giá trị lớn nhất sau khi tìm kiếm xong
            setMaxPrice(maxPriceValue);
        }
    }, [products]);
    // console.log(variants)
    return (
        <div className="flex gap-2">
            <PriceDropDown
                obj={{
                    name: "Price",
                    price: maxPrice,
                }}
            />
            {variants.map((el) => (
                <DropDown key={el.name} obj={el} />
            ))}
        </div>
    );
};

export default Variants;
